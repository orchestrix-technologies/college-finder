import uuid

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.core.validators import MaxValueValidator, MinValueValidator, RegexValidator
from django.db import models
from django.utils import timezone

from core.models import BaseModel, TimestampedModel


phone_validator = RegexValidator(
    regex=r"^\+?1?\d{9,15}$",
    message="Enter a valid phone number (9–15 digits, optional leading +).",
)


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email address is required.")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)
        extra_fields.setdefault("is_email_verified", True)
        if not extra_fields.get("is_staff"):
            raise ValueError("Superuser must have is_staff=True.")
        if not extra_fields.get("is_superuser"):
            raise ValueError("Superuser must have is_superuser=True.")
        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin, TimestampedModel):
    """
    Custom user model. Inherits TimestampedModel for created_at / updated_at.
    id is kept inline because AbstractBaseUser does not define a PK and
    we need the UUID PK declared before Django's auth internals run.
    """

    class Gender(models.TextChoices):
        MALE = "male", "Male"
        FEMALE = "female", "Female"
        OTHER = "other", "Other"
        PREFER_NOT = "prefer_not_to_say", "Prefer Not to Say"

    class EducationLevel(models.TextChoices):
        CLASS_10 = "class_10", "Class 10"
        CLASS_12 = "class_12", "Class 12"
        DIPLOMA = "diploma", "Diploma"
        GRADUATE = "graduate", "Graduate"
        POST_GRADUATE = "post_graduate", "Post Graduate"
        OTHER = "other", "Other"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True, db_index=True)
    phone = models.CharField(
        max_length=15,
        unique=True,
        null=True,
        blank=True,
        validators=[phone_validator],
        db_index=True,
    )
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100, blank=True)
    gender = models.CharField(max_length=20, choices=Gender.choices, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    profile_photo = models.ImageField(
        upload_to="users/photos/%Y/%m/", null=True, blank=True
    )

    current_education_level = models.CharField(
        max_length=20, choices=EducationLevel.choices, blank=True
    )
    twelfth_percentage = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        null=True,
        blank=True,
        validators=[MinValueValidator(0), MaxValueValidator(100)],
    )
    twelfth_year = models.PositiveSmallIntegerField(null=True, blank=True)
    tenth_percentage = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        null=True,
        blank=True,
        validators=[MinValueValidator(0), MaxValueValidator(100)],
    )
    tenth_year = models.PositiveSmallIntegerField(null=True, blank=True)

    jee_main_rank = models.PositiveIntegerField(null=True, blank=True)
    jee_advanced_rank = models.PositiveIntegerField(null=True, blank=True)
    neet_score = models.PositiveSmallIntegerField(null=True, blank=True)
    neet_rank = models.PositiveIntegerField(null=True, blank=True)
    cat_percentile = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, blank=True
    )
    mat_score = models.PositiveSmallIntegerField(null=True, blank=True)
    clat_rank = models.PositiveIntegerField(null=True, blank=True)
    gate_score = models.PositiveSmallIntegerField(null=True, blank=True)
    gmat_score = models.PositiveSmallIntegerField(null=True, blank=True)
    xat_percentile = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, blank=True
    )

    state = models.ForeignKey(
        "colleges.State",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="users",
    )
    city = models.ForeignKey(
        "colleges.City",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="users",
    )

    preferred_degree_level = models.CharField(max_length=20, blank=True)
    preferred_field = models.CharField(
        max_length=100, blank=True, help_text="e.g. Engineering, Medical"
    )
    budget_min = models.PositiveIntegerField(
        null=True, blank=True, help_text="Annual fee budget in INR"
    )
    budget_max = models.PositiveIntegerField(
        null=True, blank=True, help_text="Annual fee budget in INR"
    )
    preferred_states = models.ManyToManyField(
        "colleges.State", blank=True, related_name="preferred_by_users"
    )
    open_to_hostel = models.BooleanField(null=True, blank=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_email_verified = models.BooleanField(default=False)
    is_phone_verified = models.BooleanField(default=False)

    last_login_ip = models.GenericIPAddressField(null=True, blank=True)
    date_joined = models.DateTimeField(default=timezone.now)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name"]

    objects = UserManager()

    class Meta:
        db_table = "users"
        verbose_name = "User"
        verbose_name_plural = "Users"
        indexes = [
            models.Index(fields=["email"]),
            models.Index(fields=["phone"]),
            models.Index(fields=["created_at"]),
            models.Index(fields=["is_active", "is_email_verified"]),
        ]

    def __str__(self):
        return f"{self.full_name} <{self.email}>"

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}".strip()


class OTPVerification(BaseModel):
    """
    Short-lived OTP record for email / phone verification.
    Inherits id (UUID), created_at, updated_at from BaseModel.
    """

    class OTPType(models.TextChoices):
        EMAIL = "email", "Email"
        PHONE = "phone", "Phone"

    class OTPPurpose(models.TextChoices):
        REGISTRATION = "registration", "Registration"
        LOGIN = "login", "Login"
        PASSWORD_RESET = "password_reset", "Password Reset"
        PHONE_VERIFY = "phone_verify", "Phone Verification"
        EMAIL_CHANGE = "email_change", "Email Change"

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="otps",
        null=True,
        blank=True,
    )
    otp_type = models.CharField(max_length=10, choices=OTPType.choices)
    purpose = models.CharField(max_length=20, choices=OTPPurpose.choices)
    identifier = models.CharField(
        max_length=255, help_text="Email address or phone number"
    )
    otp_code = models.CharField(max_length=6)
    is_used = models.BooleanField(default=False)
    attempts = models.PositiveSmallIntegerField(default=0)
    expires_at = models.DateTimeField()

    class Meta:
        db_table = "otp_verifications"
        indexes = [
            models.Index(fields=["identifier", "otp_type", "purpose"]),
            models.Index(fields=["expires_at"]),
        ]

    def is_valid(self):
        return (
            not self.is_used
            and self.expires_at > timezone.now()
            and self.attempts < 3
        )

    def __str__(self):
        return f"OTP({self.otp_type}) for {self.identifier}"


class UserSavedCollege(BaseModel):
    """
    Student's college wishlist / shortlist.
    Inherits id, created_at, updated_at from BaseModel.
    """

    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="saved_colleges"
    )
    college = models.ForeignKey(
        "colleges.College", on_delete=models.CASCADE, related_name="saved_by_users"
    )
    notes = models.TextField(blank=True)

    class Meta:
        db_table = "user_saved_colleges"
        unique_together = ("user", "college")
        indexes = [models.Index(fields=["user", "created_at"])]

    def __str__(self):
        return f"{self.user.email} → {self.college}"


class UserCollegeComparison(BaseModel):
    """
    Saved comparison sessions (max 4 colleges per session by business rule).
    Inherits id, created_at, updated_at from BaseModel.
    """

    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="comparisons"
    )
    colleges = models.ManyToManyField(
        "colleges.College", related_name="in_comparisons"
    )
    name = models.CharField(
        max_length=100, blank=True, help_text="Optional label given by user"
    )

    class Meta:
        db_table = "user_college_comparisons"

    def __str__(self):
        return f"{self.user.email} — comparison {self.id}"


class UserActivity(BaseModel):
    """
    Behavioural event log for anonymous and authenticated users.
    Inherits id, created_at, updated_at from BaseModel.
    """

    class ActivityType(models.TextChoices):
        PAGE_VIEW = "page_view", "Page View"
        COLLEGE_VIEW = "college_view", "College View"
        COURSE_VIEW = "course_view", "Course View"
        SEARCH = "search", "Search"
        FILTER_APPLY = "filter_apply", "Filter Apply"
        BROCHURE_DOWNLOAD = "brochure_download", "Brochure Download"
        APPLY_CLICK = "apply_click", "Apply Click"
        ENQUIRY_FORM = "enquiry_form", "Enquiry Form"
        COMPARISON_ADD = "comparison_add", "Comparison Add"
        SHORTLIST_ADD = "shortlist_add", "Shortlist Add"
        SHORTLIST_REMOVE = "shortlist_remove", "Shortlist Remove"

    user = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="activities",
    )
    session_key = models.CharField(
        max_length=64, blank=True, help_text="Anonymous session identifier"
    )
    activity_type = models.CharField(
        max_length=30, choices=ActivityType.choices, db_index=True
    )
    college = models.ForeignKey(
        "colleges.College",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="user_activities",
    )
    course = models.ForeignKey(
        "courses.Course",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="user_activities",
    )
    metadata = models.JSONField(
        default=dict,
        blank=True,
        help_text="Search query, filter params, scroll depth, etc.",
    )
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.TextField(blank=True)
    referrer = models.URLField(blank=True)

    class Meta:
        db_table = "user_activities"
        indexes = [
            models.Index(fields=["user", "activity_type", "created_at"]),
            models.Index(fields=["college", "activity_type"]),
            models.Index(fields=["session_key", "created_at"]),
            models.Index(fields=["created_at"]),
        ]

    def __str__(self):
        actor = self.user or self.session_key or "anon"
        return f"{actor} → {self.activity_type}"
