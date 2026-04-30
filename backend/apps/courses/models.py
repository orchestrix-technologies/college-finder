from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.utils.text import slugify

from core.models import BaseModel, SEOModel, UUIDModel


class DegreeLevel(UUIDModel):
    """Top-level academic tier: UG, PG, PhD, Diploma, Certificate, Integrated."""

    class Level(models.TextChoices):
        UG = "ug", "Undergraduate (UG)"
        PG = "pg", "Postgraduate (PG)"
        PHD = "phd", "Doctorate (PhD)"
        DIPLOMA = "diploma", "Diploma"
        PG_DIPLOMA = "pg_diploma", "PG Diploma"
        CERTIFICATE = "certificate", "Certificate"
        INTEGRATED = "integrated", "Integrated (UG + PG)"
        FELLOWSHIP = "fellowship", "Fellowship"

    name = models.CharField(max_length=50, unique=True)
    level = models.CharField(max_length=15, choices=Level.choices, unique=True)
    display_order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        db_table = "degree_levels"
        ordering = ["display_order"]

    def __str__(self):
        return self.name


class DegreeType(UUIDModel):
    """
    Named degree programmes: B.Tech, MBA, MBBS, BCA, MCA, LLB, M.Tech, etc.
    UUIDModel → reference data; no audit trail required.
    """

    degree_level = models.ForeignKey(
        DegreeLevel, on_delete=models.CASCADE, related_name="degree_types"
    )
    name = models.CharField(
        max_length=100, unique=True, help_text="Full name: Bachelor of Technology"
    )
    short_name = models.CharField(max_length=20, help_text="B.Tech")
    slug = models.SlugField(max_length=120, unique=True, blank=True)
    typical_duration_years = models.PositiveSmallIntegerField(
        null=True,
        blank=True,
        help_text="Standard duration (can be overridden per course)",
    )
    is_active = models.BooleanField(default=True)
    display_order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        db_table = "degree_types"
        ordering = ["display_order", "short_name"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.short_name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.short_name


class Department(UUIDModel):
    """
    Broad academic department: Engineering, Medical, Management, Law, etc.
    UUIDModel → reference data.
    """

    name = models.CharField(max_length=150, unique=True)
    slug = models.SlugField(max_length=180, unique=True, blank=True)
    icon = models.CharField(max_length=50, blank=True)
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    display_order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        db_table = "departments"
        ordering = ["display_order", "name"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Specialization(UUIDModel):
    """
    Named specialization within a department.
    e.g. Department=Engineering → Computer Science, Mechanical, Civil, etc.
    UUIDModel → reference data; no audit trail required.
    """

    department = models.ForeignKey(
        Department, on_delete=models.CASCADE, related_name="specializations"
    )
    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, blank=True)
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = "specializations"
        unique_together = ("department", "name")
        ordering = ["name"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(f"{self.department.name} {self.name}")
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.department.name} — {self.name}"


class Course(BaseModel, SEOModel):
    class CourseMode(models.TextChoices):
        FULL_TIME = "full_time", "Full-Time"
        PART_TIME = "part_time", "Part-Time"
        ONLINE = "online", "Online"
        DISTANCE = "distance", "Distance / Correspondence"
        HYBRID = "hybrid", "Hybrid (Blended)"
        WEEKEND = "weekend", "Weekend"

    class Status(models.TextChoices):
        DRAFT = "draft", "Draft"
        PUBLISHED = "published", "Published"
        DISCONTINUED = "discontinued", "Discontinued"

    college = models.ForeignKey(
        "colleges.College", on_delete=models.CASCADE, related_name="courses"
    )
    degree_level = models.ForeignKey(
        DegreeLevel, on_delete=models.PROTECT, related_name="courses"
    )
    degree_type = models.ForeignKey(
        DegreeType, on_delete=models.PROTECT, related_name="courses"
    )
    department = models.ForeignKey(
        Department, on_delete=models.PROTECT, related_name="courses"
    )
    specialization = models.ForeignKey(
        Specialization,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="courses",
    )
    name = models.CharField(max_length=300, db_index=True)
    slug = models.SlugField(max_length=350, blank=True)
    short_description = models.CharField(max_length=500, blank=True)
    description = models.TextField(blank=True)

    mode = models.CharField(
        max_length=15,
        choices=CourseMode.choices,
        default=CourseMode.FULL_TIME,
        db_index=True,
    )
    duration_years = models.PositiveSmallIntegerField()
    total_semesters = models.PositiveSmallIntegerField(null=True, blank=True)
    total_credits = models.PositiveSmallIntegerField(null=True, blank=True)
    has_lateral_entry = models.BooleanField(
        default=False, help_text="Lateral entry available (e.g. diploma holders)"
    )
    lateral_entry_year = models.PositiveSmallIntegerField(
        null=True, blank=True, help_text="Which year lateral entry joins"
    )

    total_fee = models.PositiveIntegerField(
        null=True, blank=True, help_text="Total programme fee in INR", db_index=True
    )
    fee_per_year = models.PositiveIntegerField(
        null=True, blank=True, help_text="Approx first-year fee in INR"
    )
    hostel_fee_per_year = models.PositiveIntegerField(null=True, blank=True)

    min_percentage_required = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        null=True,
        blank=True,
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        help_text="Minimum aggregate % (usually in 10+2)",
    )
    min_age = models.PositiveSmallIntegerField(null=True, blank=True)
    max_age = models.PositiveSmallIntegerField(null=True, blank=True)

    total_intake = models.PositiveSmallIntegerField(
        null=True, blank=True, help_text="Total sanctioned seats"
    )

    status = models.CharField(
        max_length=15, choices=Status.choices, default=Status.DRAFT, db_index=True
    )
    is_featured = models.BooleanField(default=False)

    class Meta:
        db_table = "courses"
        ordering = ["name"]
        indexes = [
            models.Index(fields=["college", "status"]),
            models.Index(fields=["degree_level", "degree_type"]),
            models.Index(fields=["department", "specialization"]),
            models.Index(fields=["mode", "status"]),
            models.Index(fields=["total_fee"]),
        ]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(f"{self.college_id} {self.name}")
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.college} — {self.name}"


class CourseFeeStructure(BaseModel):
    """Granular fee breakdown per year and semester for a course."""

    course = models.ForeignKey(
        Course, on_delete=models.CASCADE, related_name="fee_structure"
    )
    academic_year = models.CharField(
        max_length=10, blank=True, help_text="e.g. 2024-25"
    )
    year_number = models.PositiveSmallIntegerField(
        help_text="Programme year: 1, 2, 3, 4"
    )
    semester_number = models.PositiveSmallIntegerField(
        null=True, blank=True, help_text="Odd/even semester within the year"
    )

    tuition_fee = models.PositiveIntegerField(default=0)
    exam_fee = models.PositiveIntegerField(default=0)
    library_fee = models.PositiveIntegerField(default=0)
    lab_fee = models.PositiveIntegerField(default=0)
    sports_fee = models.PositiveIntegerField(default=0)
    development_fee = models.PositiveIntegerField(default=0)
    admission_fee = models.PositiveIntegerField(default=0)
    miscellaneous_fee = models.PositiveIntegerField(default=0)
    total_fee = models.PositiveIntegerField(
        default=0, help_text="Sum of all components for this period"
    )
    caution_deposit = models.PositiveIntegerField(default=0)

    is_latest = models.BooleanField(
        default=True, help_text="Mark False for historical fee data"
    )

    class Meta:
        db_table = "course_fee_structures"
        ordering = ["year_number", "semester_number"]
        indexes = [
            models.Index(fields=["course", "year_number"]),
            models.Index(fields=["course", "is_latest"]),
        ]

class CourseEligibility(BaseModel):
    """
    Detailed eligibility criteria — OneToOne with Course.
    BaseModel → UUID pk + created_at + updated_at.
    """

    course = models.OneToOneField(
        Course, on_delete=models.CASCADE, related_name="eligibility"
    )

    min_percentage_10th = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, blank=True
    )
    min_percentage_12th = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, blank=True
    )
    min_percentage_graduation = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, blank=True
    )
    min_percentage_ug = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        null=True,
        blank=True,
        help_text="For PG courses",
    )

    required_subjects_12th = models.JSONField(default=list, blank=True)
    required_subjects_grad = models.JSONField(default=list, blank=True)

    min_work_experience_years = models.PositiveSmallIntegerField(null=True, blank=True)
    work_experience_description = models.TextField(blank=True)

    min_age = models.PositiveSmallIntegerField(null=True, blank=True)
    max_age = models.PositiveSmallIntegerField(null=True, blank=True)

    open_to_nri = models.BooleanField(default=False)
    open_to_foreign_nationals = models.BooleanField(default=False)
    domicile_requirement = models.CharField(max_length=255, blank=True)
    additional_criteria = models.TextField(blank=True)

    class Meta:
        db_table = "course_eligibilities"


class CourseEntranceExam(models.Model):
    """Entrance exams accepted for admission to a specific course."""

    course = models.ForeignKey(
        Course, on_delete=models.CASCADE, related_name="entrance_exams"
    )
    exam = models.ForeignKey(
        "colleges.EntranceExam",
        on_delete=models.CASCADE,
        related_name="course_mappings",
    )
    is_mandatory = models.BooleanField(default=True)
    min_rank = models.PositiveIntegerField(null=True, blank=True)
    min_percentile = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, blank=True
    )
    min_score = models.PositiveSmallIntegerField(null=True, blank=True)
    notes = models.CharField(max_length=255, blank=True)

    class Meta:
        db_table = "course_entrance_exams"
        unique_together = ("course", "exam")


class CourseSeatMatrix(UUIDModel):
    """Regulatory seat matrix per category for a given academic year."""

    class Category(models.TextChoices):
        GENERAL = "general", "General / UR"
        OBC = "obc", "OBC"
        OBC_NCL = "obc_ncl", "OBC-NCL"
        SC = "sc", "SC"
        ST = "st", "ST"
        EWS = "ews", "EWS"
        PWD = "pwd", "PwD"
        NRI = "nri", "NRI"
        MANAGEMENT = "management", "Management Quota"
        FOREIGN = "foreign", "Foreign National"
        TFWS = "tfws", "Tuition Fee Waiver Scheme"

    course = models.ForeignKey(
        Course, on_delete=models.CASCADE, related_name="seat_matrix"
    )
    academic_year = models.CharField(max_length=10, help_text="e.g. 2024-25")
    category = models.CharField(max_length=20, choices=Category.choices)
    total_seats = models.PositiveSmallIntegerField(default=0)
    filled_seats = models.PositiveSmallIntegerField(null=True, blank=True)

    class Meta:
        db_table = "course_seat_matrices"
        unique_together = ("course", "academic_year", "category")
        indexes = [models.Index(fields=["course", "academic_year"])]


class CourseSyllabus(UUIDModel):
    """Subject-level syllabus entries per semester for a course."""

    course = models.ForeignKey(
        Course, on_delete=models.CASCADE, related_name="syllabus"
    )
    semester = models.PositiveSmallIntegerField()
    subject_name = models.CharField(max_length=255)
    subject_code = models.CharField(max_length=30, blank=True)
    credits = models.PositiveSmallIntegerField(null=True, blank=True)
    is_core = models.BooleanField(default=True)
    is_elective = models.BooleanField(default=False)
    description = models.TextField(blank=True)

    class Meta:
        db_table = "course_syllabi"
        ordering = ["semester", "subject_name"]
        indexes = [models.Index(fields=["course", "semester"])]


class CoursePlacementStat(BaseModel):
    """Placement stats specific to a course."""

    course = models.ForeignKey(
        Course, on_delete=models.CASCADE, related_name="placement_stats"
    )
    year = models.PositiveSmallIntegerField()
    batch = models.CharField(max_length=20, blank=True)
    total_students_eligible = models.PositiveSmallIntegerField(null=True, blank=True)
    total_students_placed = models.PositiveSmallIntegerField(null=True, blank=True)
    placement_percentage = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, blank=True
    )
    avg_package_lpa = models.DecimalField(
        max_digits=6, decimal_places=2, null=True, blank=True
    )
    highest_package_lpa = models.DecimalField(
        max_digits=6, decimal_places=2, null=True, blank=True
    )
    top_recruiters_snapshot = models.JSONField(default=list, blank=True)

    class Meta:
        db_table = "course_placement_stats"
        unique_together = ("course", "year")
        ordering = ["-year"]
