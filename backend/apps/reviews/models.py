from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models

from core.models import BaseModel


class Review(BaseModel):
    """
    Student review of a college.
    BaseModel → UUID pk + created_at + updated_at.
    Multi-dimensional ratings stored as separate integer fields to enable
    dimension-specific sorting and analytics.
    """

    class Status(models.TextChoices):
        PENDING = "pending", "Pending Moderation"
        APPROVED = "approved", "Approved"
        REJECTED = "rejected", "Rejected"
        FLAGGED = "flagged", "Flagged for Re-review"

    user = models.ForeignKey(
        "users.User", on_delete=models.CASCADE, related_name="reviews"
    )
    college = models.ForeignKey(
        "colleges.College", on_delete=models.CASCADE, related_name="reviews"
    )
    course = models.ForeignKey(
        "courses.Course",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="reviews",
        help_text="Course the reviewer studied",
    )

    overall_rating = models.DecimalField(
        max_digits=2,
        decimal_places=1,
        validators=[MinValueValidator(1), MaxValueValidator(5)],
    )
    placement_rating = models.PositiveSmallIntegerField(
        null=True, blank=True, validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    faculty_rating = models.PositiveSmallIntegerField(
        null=True, blank=True, validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    infrastructure_rating = models.PositiveSmallIntegerField(
        null=True, blank=True, validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    campus_life_rating = models.PositiveSmallIntegerField(
        null=True, blank=True, validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    value_for_money_rating = models.PositiveSmallIntegerField(
        null=True, blank=True, validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    hostel_rating = models.PositiveSmallIntegerField(
        null=True, blank=True, validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    sports_rating = models.PositiveSmallIntegerField(
        null=True, blank=True, validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    library_rating = models.PositiveSmallIntegerField(
        null=True, blank=True, validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    industry_exposure_rating = models.PositiveSmallIntegerField(
        null=True,
        blank=True,
        validators=[MinValueValidator(1), MaxValueValidator(5)],
        help_text="Industry visits, internships, guest lectures",
    )

    title = models.CharField(max_length=255)
    pros = models.TextField(help_text="What the reviewer liked")
    cons = models.TextField(blank=True, help_text="What could be better")
    advice = models.TextField(
        blank=True, help_text="Advice to future students / aspirants"
    )

    batch_year = models.PositiveSmallIntegerField(
        null=True, blank=True, help_text="Year of joining"
    )
    graduation_year = models.PositiveSmallIntegerField(
        null=True, blank=True, help_text="Year of passing out"
    )
    is_current_student = models.BooleanField(default=False)
    program_studied = models.CharField(max_length=255, blank=True)

    is_verified_student = models.BooleanField(
        default=False, help_text="Admin has verified the student's enrolment"
    )
    is_anonymous = models.BooleanField(
        default=False, help_text="Display name hidden from public"
    )
    verification_doc = models.FileField(
        upload_to="reviews/verification/%Y/%m/",
        null=True,
        blank=True,
        help_text="Student ID / marksheet uploaded by reviewer",
    )

    helpful_count = models.PositiveIntegerField(default=0)
    not_helpful_count = models.PositiveIntegerField(default=0)

    status = models.CharField(
        max_length=10, choices=Status.choices, default=Status.PENDING, db_index=True
    )
    rejection_reason = models.TextField(blank=True)
    moderated_by = models.ForeignKey(
        "users.User",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="moderated_reviews",
    )
    moderated_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = "reviews"
        indexes = [
            models.Index(fields=["college", "status", "-created_at"]),
            models.Index(fields=["user", "college"]),
            models.Index(fields=["status", "created_at"]),
            models.Index(fields=["overall_rating"]),
        ]

    def __str__(self):
        return f"{self.user} → {self.college} ({self.overall_rating}★)"


class ReviewHelpfulness(BaseModel):
    """
    Per-user helpful / not-helpful vote on a review.
    BaseModel → UUID pk + created_at + updated_at.
    """

    review = models.ForeignKey(
        Review, on_delete=models.CASCADE, related_name="helpfulness_votes"
    )
    user = models.ForeignKey(
        "users.User", on_delete=models.CASCADE, related_name="review_votes"
    )
    is_helpful = models.BooleanField(help_text="True = helpful, False = not helpful")

    class Meta:
        db_table = "review_helpfulness"
        unique_together = ("review", "user")


class ReviewMedia(BaseModel):
    """
    Images attached to a review by the student.
    BaseModel → UUID pk + created_at + updated_at.
    """

    review = models.ForeignKey(Review, on_delete=models.CASCADE, related_name="media")
    file = models.ImageField(upload_to="reviews/media/%Y/%m/")
    caption = models.CharField(max_length=255, blank=True)
    display_order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        db_table = "review_media"
        ordering = ["display_order"]


class ReviewReply(BaseModel):
    """
    Official reply to a review — from admin or claimed college representative.
    OneToOne: only one authoritative reply per review.
    BaseModel → UUID pk + created_at + updated_at.
    """

    review = models.OneToOneField(
        Review, on_delete=models.CASCADE, related_name="reply"
    )
    replied_by = models.ForeignKey(
        "users.User",
        on_delete=models.SET_NULL,
        null=True,
        related_name="review_replies",
    )
    reply_text = models.TextField()
    is_college_reply = models.BooleanField(
        default=False, help_text="True = college official reply"
    )
    is_admin_reply = models.BooleanField(default=False)

    class Meta:
        db_table = "review_replies"

    def __str__(self):
        return f"Reply to review {self.review_id}"


class ReviewReport(BaseModel):
    """
    User flags a review as abusive, fake, or spam.
    BaseModel → UUID pk + created_at + updated_at.
    """

    class Reason(models.TextChoices):
        FAKE = "fake", "Fake Review"
        SPAM = "spam", "Spam"
        ABUSIVE = "abusive", "Abusive Language"
        IRRELEVANT = "irrelevant", "Irrelevant Content"
        CONFLICT = "conflict", "Conflict of Interest"
        OTHER = "other", "Other"

    review = models.ForeignKey(
        Review, on_delete=models.CASCADE, related_name="reports"
    )
    reported_by = models.ForeignKey(
        "users.User", on_delete=models.CASCADE, related_name="review_reports"
    )
    reason = models.CharField(max_length=20, choices=Reason.choices)
    description = models.TextField(blank=True)
    is_resolved = models.BooleanField(default=False)
    resolved_by = models.ForeignKey(
        "users.User",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="resolved_reports",
    )

    class Meta:
        db_table = "review_reports"
        unique_together = ("review", "reported_by")


class ReviewModerationLog(BaseModel):
    """
    Immutable audit trail for every moderation action on a review.
    BaseModel → UUID pk + created_at + updated_at.
    """

    class Action(models.TextChoices):
        APPROVED = "approved", "Approved"
        REJECTED = "rejected", "Rejected"
        FLAGGED = "flagged", "Flagged"
        RESTORED = "restored", "Restored"
        EDITED = "edited", "Edited by Admin"

    review = models.ForeignKey(
        Review, on_delete=models.CASCADE, related_name="moderation_logs"
    )
    action = models.CharField(max_length=20, choices=Action.choices)
    reason = models.TextField(blank=True)
    performed_by = models.ForeignKey(
        "users.User",
        on_delete=models.SET_NULL,
        null=True,
        related_name="moderation_actions",
    )

    class Meta:
        db_table = "review_moderation_logs"
        ordering = ["-created_at"]
