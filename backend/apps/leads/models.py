from django.db import models

from core.models import BaseModel, UUIDModel


class Lead(BaseModel):
    """
    Central lead record created whenever a student takes a qualifying action
    (brochure download, apply-now click, enquiry form submission).
    One lead = one student → one college action event.
    BaseModel → UUID pk + created_at + updated_at.
    """

    class Source(models.TextChoices):
        BROCHURE_DOWNLOAD = "brochure_download", "Brochure Download"
        APPLY_NOW = "apply_now", "Apply Now"
        ENQUIRY_FORM = "enquiry_form", "Enquiry Form"
        COMPARISON = "comparison", "College Comparison"
        SHORTLIST = "shortlist", "Shortlist / Save"
        DIRECT = "direct", "Direct (Admin-created)"

    class Status(models.TextChoices):
        NEW = "new", "New"
        NOTIFIED = "notified", "College Notified"
        CONTACTED = "contacted", "College Contacted Student"
        QUALIFIED = "qualified", "Qualified"
        INTERESTED = "interested", "Student Interested"
        NOT_INTERESTED = "not_interested", "Student Not Interested"
        CONVERTED = "converted", "Converted (Enrolled)"
        LOST = "lost", "Lost"
        DUPLICATE = "duplicate", "Duplicate"
        JUNK = "junk", "Junk / Invalid"

    user = models.ForeignKey(
        "users.User",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="leads",
        help_text="Null only for legacy / pre-auth leads",
    )
    college = models.ForeignKey(
        "colleges.College", on_delete=models.CASCADE, related_name="leads"
    )
    course = models.ForeignKey(
        "courses.Course",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="leads",
    )
    brochure = models.ForeignKey(
        "colleges.Brochure",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="leads",
    )

    name = models.CharField(max_length=200)
    email = models.EmailField(db_index=True)
    phone = models.CharField(max_length=15, db_index=True)
    state = models.ForeignKey(
        "colleges.State",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="leads",
    )
    city = models.ForeignKey(
        "colleges.City",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="leads",
    )
    current_education = models.CharField(max_length=50, blank=True)
    exam_score_info = models.CharField(
        max_length=255,
        blank=True,
        help_text="Free text: JEE rank, NEET score, etc.",
    )

    source = models.CharField(
        max_length=30, choices=Source.choices, db_index=True
    )
    source_url = models.URLField(
        blank=True, help_text="Page URL where action happened"
    )
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.TextField(blank=True)

    utm_source = models.CharField(max_length=100, blank=True)
    utm_medium = models.CharField(max_length=100, blank=True)
    utm_campaign = models.CharField(max_length=100, blank=True)
    utm_term = models.CharField(max_length=100, blank=True)
    utm_content = models.CharField(max_length=100, blank=True)

    status = models.CharField(
        max_length=20, choices=Status.choices, default=Status.NEW, db_index=True
    )

    email_sent_to_college = models.BooleanField(default=False)
    email_sent_at = models.DateTimeField(null=True, blank=True)
    notification_count = models.PositiveSmallIntegerField(default=0)

    class Meta:
        db_table = "leads"
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["college", "status", "created_at"]),
            models.Index(fields=["email", "college"]),
            models.Index(fields=["source", "created_at"]),
            models.Index(fields=["utm_source", "utm_campaign"]),
            models.Index(fields=["created_at", "status"]),
            models.Index(fields=["college", "created_at"]),
        ]

    def __str__(self):
        return f"Lead({self.name}, {self.college}, {self.source})"


class LeadActivity(BaseModel):
    """
    Immutable audit trail: every status change or key action on a lead.
    Powers the CRM timeline view.
    BaseModel → UUID pk + created_at + updated_at.
    """

    class ActionType(models.TextChoices):
        STATUS_CHANGE = "status_change", "Status Changed"
        EMAIL_SENT = "email_sent", "Email Sent to College"
        NOTE_ADDED = "note_added", "Note Added"
        CALL_LOGGED = "call_logged", "Call Logged"
        DUPLICATE_MERGED = "duplicate_merged", "Marked Duplicate"

    lead = models.ForeignKey(
        Lead, on_delete=models.CASCADE, related_name="activities"
    )
    action_type = models.CharField(max_length=20, choices=ActionType.choices)
    from_status = models.CharField(max_length=20, blank=True)
    to_status = models.CharField(max_length=20, blank=True)
    notes = models.TextField(blank=True)
    changed_by = models.ForeignKey(
        "users.User",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="lead_actions",
    )

    class Meta:
        db_table = "lead_activities"
        ordering = ["-created_at"]
        indexes = [models.Index(fields=["lead", "created_at"])]


class LeadNote(BaseModel):
    """
    CRM-style freeform notes attached to a lead by admin or college rep.
    BaseModel → UUID pk + created_at + updated_at.
    """

    lead = models.ForeignKey(Lead, on_delete=models.CASCADE, related_name="notes")
    note = models.TextField()
    is_internal = models.BooleanField(
        default=True,
        help_text="Internal notes are not shared with the college",
    )
    created_by = models.ForeignKey(
        "users.User",
        on_delete=models.SET_NULL,
        null=True,
        related_name="lead_notes",
    )

    class Meta:
        db_table = "lead_notes"
        ordering = ["-created_at"]


class BrochureDownload(UUIDModel):
    """
    Every brochure download event — one record per download.
    UUIDModel (no updated_at): append-only event log.
    Uses `downloaded_at` instead of the generic `created_at` for domain clarity.
    """

    lead = models.ForeignKey(
        Lead,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="brochure_downloads",
    )
    user = models.ForeignKey(
        "users.User",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="brochure_downloads",
    )
    brochure = models.ForeignKey(
        "colleges.Brochure",
        on_delete=models.CASCADE,
        related_name="download_events",
    )
    college = models.ForeignKey(
        "colleges.College",
        on_delete=models.CASCADE,
        related_name="brochure_download_events",
    )
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.TextField(blank=True)
    downloaded_at = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        db_table = "brochure_downloads"
        indexes = [
            models.Index(fields=["college", "downloaded_at"]),
            models.Index(fields=["brochure", "downloaded_at"]),
            models.Index(fields=["user", "downloaded_at"]),
        ]

    def __str__(self):
        return f"{self.user or self.ip_address} downloaded {self.brochure}"


class LeadReport(UUIDModel):
    """
    Pre-aggregated lead metrics snapshot generated by a nightly Celery task.
    UUIDModel: append-only snapshots; uses `generated_at` for domain clarity.
    college=NULL → platform-wide totals.
    """

    class ReportType(models.TextChoices):
        DAILY = "daily", "Daily"
        WEEKLY = "weekly", "Weekly"
        MONTHLY = "monthly", "Monthly"

    report_type = models.CharField(
        max_length=10, choices=ReportType.choices, db_index=True
    )
    report_date = models.DateField(db_index=True)
    college = models.ForeignKey(
        "colleges.College",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="lead_reports",
        help_text="NULL = platform-wide aggregate",
    )

    total_leads = models.PositiveIntegerField(default=0)
    new_leads = models.PositiveIntegerField(default=0)
    contacted_leads = models.PositiveIntegerField(default=0)
    converted_leads = models.PositiveIntegerField(default=0)
    lost_leads = models.PositiveIntegerField(default=0)
    junk_leads = models.PositiveIntegerField(default=0)
    brochure_downloads = models.PositiveIntegerField(default=0)
    apply_clicks = models.PositiveIntegerField(default=0)
    enquiry_form_submits = models.PositiveIntegerField(default=0)

    conversion_rate = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        null=True,
        blank=True,
        help_text="converted_leads / total_leads × 100",
    )

    leads_by_source = models.JSONField(default=dict, blank=True)
    leads_by_state = models.JSONField(default=dict, blank=True)
    top_courses = models.JSONField(default=list, blank=True)
    leads_by_utm_source = models.JSONField(default=dict, blank=True)

    generated_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "lead_reports"
        unique_together = ("report_type", "report_date", "college")
        ordering = ["-report_date"]
        indexes = [
            models.Index(fields=["report_type", "report_date"]),
            models.Index(fields=["college", "report_date"]),
        ]

    def __str__(self):
        college_name = self.college.name if self.college else "Platform-wide"
        return f"{self.report_type} | {self.report_date} | {college_name}"


class CollegeLeadSummary(models.Model):
    """
    Running totals per college — updated atomically on each new lead via a
    post_save signal. Avoids expensive aggregation queries on the leads table
    in dashboard / listing-sort scenarios.

    Plain Model: college IS the primary key (OneToOneField with primary_key=True),
    so UUIDModel does not apply here.
    """

    college = models.OneToOneField(
        "colleges.College",
        on_delete=models.CASCADE,
        related_name="lead_summary",
        primary_key=True,
    )
    total_leads = models.PositiveIntegerField(default=0)
    leads_this_month = models.PositiveIntegerField(default=0)
    leads_this_week = models.PositiveIntegerField(default=0)
    leads_today = models.PositiveIntegerField(default=0)
    total_brochure_downloads = models.PositiveIntegerField(default=0)
    total_apply_clicks = models.PositiveIntegerField(default=0)
    total_converted = models.PositiveIntegerField(default=0)
    conversion_rate = models.DecimalField(
        max_digits=5, decimal_places=2, default=0
    )
    last_lead_at = models.DateTimeField(null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "college_lead_summaries"

    def __str__(self):
        return f"LeadSummary({self.college})"
