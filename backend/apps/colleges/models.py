from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.utils.text import slugify

from core.models import BaseModel, SEOModel, UUIDModel

class Country(UUIDModel):
    name = models.CharField(max_length=100, unique=True)
    code = models.CharField(max_length=3, unique=True, help_text="ISO 3166-1 alpha-2")
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = "countries"
        verbose_name_plural = "countries"
        ordering = ["name"]

    def __str__(self):
        return self.name


class State(UUIDModel):
    country = models.ForeignKey(
        Country, on_delete=models.CASCADE, related_name="states"
    )
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=10, blank=True, help_text="e.g. MH, KA, TN")
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = "states"
        unique_together = ("country", "name")
        ordering = ["name"]

    def __str__(self):
        return f"{self.name}, {self.country.name}"


class City(UUIDModel):
    state = models.ForeignKey(State, on_delete=models.CASCADE, related_name="cities")
    name = models.CharField(max_length=100)
    is_metro = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    latitude = models.DecimalField(
        max_digits=9, decimal_places=6, null=True, blank=True
    )
    longitude = models.DecimalField(
        max_digits=9, decimal_places=6, null=True, blank=True
    )

    class Meta:
        db_table = "cities"
        unique_together = ("state", "name")
        ordering = ["name"]
        indexes = [models.Index(fields=["state", "is_active"])]

    def __str__(self):
        return f"{self.name}, {self.state.name}"


class Area(UUIDModel):
    city = models.ForeignKey(City, on_delete=models.CASCADE, related_name="areas")
    name = models.CharField(max_length=150)
    pincode = models.CharField(max_length=10, blank=True)

    class Meta:
        db_table = "areas"
        ordering = ["name"]

    def __str__(self):
        return f"{self.name}, {self.city.name}"


class University(BaseModel):
    class UniversityType(models.TextChoices):
        CENTRAL = "central", "Central University"
        STATE = "state", "State University"
        DEEMED = "deemed", "Deemed University"
        PRIVATE = "private", "Private University"
        AUTONOMOUS = "autonomous", "Autonomous Institution"
        IIT = "iit", "IIT"
        NIT = "nit", "NIT"
        IIIT = "iiit", "IIIT"
        AIIMS = "aiims", "AIIMS"

    name = models.CharField(max_length=255, unique=True)
    short_name = models.CharField(max_length=50, blank=True)
    slug = models.SlugField(max_length=300, unique=True, blank=True)
    university_type = models.CharField(max_length=20, choices=UniversityType.choices)
    state = models.ForeignKey(
        State, on_delete=models.SET_NULL, null=True, related_name="universities"
    )
    city = models.ForeignKey(
        City,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="universities",
    )
    website = models.URLField(blank=True)
    established_year = models.PositiveSmallIntegerField(null=True, blank=True)
    ugc_recognized = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = "universities"
        verbose_name_plural = "universities"
        ordering = ["name"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class EntranceExam(BaseModel):
    class ExamLevel(models.TextChoices):
        NATIONAL = "national", "National"
        STATE = "state", "State"
        UNIVERSITY = "university", "University"
        INSTITUTE = "institute", "Institute"

    class ExamMode(models.TextChoices):
        ONLINE = "online", "Online (CBT)"
        OFFLINE = "offline", "Offline (Pen & Paper)"
        HYBRID = "hybrid", "Hybrid"

    class ExamStream(models.TextChoices):
        ENGINEERING = "engineering", "Engineering"
        MEDICAL = "medical", "Medical"
        MANAGEMENT = "management", "Management"
        LAW = "law", "Law"
        DESIGN = "design", "Design"
        ARCHITECTURE = "architecture", "Architecture"
        PHARMACY = "pharmacy", "Pharmacy"
        HOTEL = "hotel", "Hotel Management"
        SCIENCE = "science", "Pure Science"
        HUMANITIES = "humanities", "Humanities"
        COMMERCE = "commerce", "Commerce"
        OTHER = "other", "Other"

    name = models.CharField(max_length=100, unique=True)
    full_name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=150, unique=True, blank=True)
    stream = models.CharField(max_length=20, choices=ExamStream.choices)
    exam_level = models.CharField(max_length=20, choices=ExamLevel.choices)
    exam_mode = models.CharField(
        max_length=10, choices=ExamMode.choices, default=ExamMode.ONLINE
    )
    conducting_body = models.CharField(max_length=255, blank=True)
    website = models.URLField(blank=True)
    frequency_per_year = models.PositiveSmallIntegerField(default=1)
    max_score = models.PositiveSmallIntegerField(null=True, blank=True)
    score_validity_years = models.PositiveSmallIntegerField(default=1)
    typical_application_month = models.PositiveSmallIntegerField(null=True, blank=True)
    typical_exam_month = models.PositiveSmallIntegerField(null=True, blank=True)
    typical_result_month = models.PositiveSmallIntegerField(null=True, blank=True)
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = "entrance_exams"
        ordering = ["name"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class Facility(UUIDModel):
    class FacilityCategory(models.TextChoices):
        ACADEMIC = "academic", "Academic"
        SPORTS = "sports", "Sports"
        HOSTEL = "hostel", "Hostel & Accommodation"
        MEDICAL = "medical", "Medical"
        TRANSPORT = "transport", "Transport"
        RECREATION = "recreation", "Recreation"
        TECHNOLOGY = "technology", "Technology"
        DINING = "dining", "Dining"
        LIBRARY = "library", "Library"
        BANKING = "banking", "Banking & ATM"
        OTHER = "other", "Other"

    name = models.CharField(max_length=100, unique=True)
    category = models.CharField(max_length=20, choices=FacilityCategory.choices)
    icon = models.CharField(
        max_length=50, blank=True, help_text="Icon identifier for frontend"
    )
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = "facilities"
        verbose_name_plural = "facilities"
        ordering = ["category", "name"]

    def __str__(self):
        return self.name


class College(BaseModel, SEOModel):
    class OwnershipType(models.TextChoices):
        GOVERNMENT = "government", "Government"
        PRIVATE = "private", "Private"
        DEEMED = "deemed", "Deemed"
        AUTONOMOUS = "autonomous", "Autonomous"
        GOVT_AIDED = "govt_aided", "Government Aided"
        PPP = "ppp", "Public-Private Partnership"

    class GenderType(models.TextChoices):
        CO_ED = "co_ed", "Co-Education"
        BOYS = "boys", "Boys Only"
        GIRLS = "girls", "Girls Only"

    class CollegeType(models.TextChoices):
        ENGINEERING = "engineering", "Engineering"
        MEDICAL = "medical", "Medical"
        MANAGEMENT = "management", "Management"
        LAW = "law", "Law"
        ARTS_SCIENCE = "arts_science", "Arts & Science"
        DENTAL = "dental", "Dental"
        PHARMACY = "pharmacy", "Pharmacy"
        ARCHITECTURE = "architecture", "Architecture"
        DESIGN = "design", "Design"
        HOTEL = "hotel", "Hotel Management"
        EDUCATION = "education", "Education (B.Ed / M.Ed)"
        VOCATIONAL = "vocational", "Vocational"
        MULTI_DISCIPLINE = "multi_discipline", "Multi-Disciplinary"
        OPEN_UNIVERSITY = "open_university", "Open / Distance University"

    class Status(models.TextChoices):
        DRAFT = "draft", "Draft"
        PENDING_REVIEW = "pending_review", "Pending Review"
        PUBLISHED = "published", "Published"
        UNPUBLISHED = "unpublished", "Unpublished"
        ARCHIVED = "archived", "Archived"

    name = models.CharField(max_length=255, db_index=True)
    short_name = models.CharField(
        max_length=100, blank=True, help_text="Abbreviation e.g. IIT-B"
    )
    slug = models.SlugField(max_length=320, unique=True, db_index=True)
    college_type = models.CharField(
        max_length=30, choices=CollegeType.choices, db_index=True
    )
    ownership_type = models.CharField(
        max_length=20, choices=OwnershipType.choices, db_index=True
    )
    gender_type = models.CharField(
        max_length=10, choices=GenderType.choices, default=GenderType.CO_ED
    )

    university = models.ForeignKey(
        University,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="affiliated_colleges",
    )
    is_autonomous = models.BooleanField(default=False)

    country = models.ForeignKey(
        Country, on_delete=models.SET_NULL, null=True, related_name="colleges"
    )
    state = models.ForeignKey(
        State, on_delete=models.SET_NULL, null=True, related_name="colleges", db_index=True
    )
    city = models.ForeignKey(
        City, on_delete=models.SET_NULL, null=True, related_name="colleges", db_index=True
    )
    area = models.ForeignKey(
        Area, on_delete=models.SET_NULL, null=True, blank=True, related_name="colleges"
    )
    address = models.TextField(blank=True)
    pincode = models.CharField(max_length=10, blank=True)
    latitude = models.DecimalField(
        max_digits=9, decimal_places=6, null=True, blank=True
    )
    longitude = models.DecimalField(
        max_digits=9, decimal_places=6, null=True, blank=True
    )

    established_year = models.PositiveSmallIntegerField(null=True, blank=True)

    website = models.URLField(blank=True)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=20, blank=True)
    alternate_phone = models.CharField(max_length=20, blank=True)
    toll_free = models.CharField(max_length=20, blank=True)

    logo = models.ImageField(upload_to="colleges/logos/", null=True, blank=True)
    cover_image = models.ImageField(
        upload_to="colleges/covers/", null=True, blank=True
    )

    description = models.TextField(blank=True)
    about_short = models.CharField(
        max_length=500, blank=True, help_text="Teaser shown on listing cards"
    )
    vision = models.TextField(blank=True)
    mission = models.TextField(blank=True)
    notable_alumni = models.JSONField(
        default=list,
        blank=True,
        help_text="[{name, designation, company, batch_year}]",
    )

    naac_grade = models.CharField(
        max_length=5, blank=True, db_index=True, help_text="A++, A+, A, B++, B+, B, C, D"
    )
    naac_cgpa = models.DecimalField(
        max_digits=4, decimal_places=2, null=True, blank=True
    )
    naac_accredited_year = models.PositiveSmallIntegerField(null=True, blank=True)
    is_nba_accredited = models.BooleanField(default=False)
    is_aicte_approved = models.BooleanField(default=False, db_index=True)
    is_ugc_recognized = models.BooleanField(default=False, db_index=True)
    is_mci_approved = models.BooleanField(
        default=False, help_text="National Medical Commission (NMC) approval"
    )
    is_bar_council_approved = models.BooleanField(default=False)
    is_pci_approved = models.BooleanField(
        default=False, help_text="Pharmacy Council of India"
    )
    is_ncte_approved = models.BooleanField(
        default=False, help_text="National Council for Teacher Education"
    )
    is_coa_approved = models.BooleanField(
        default=False, help_text="Council of Architecture"
    )

    nirf_ranking = models.PositiveSmallIntegerField(null=True, blank=True, db_index=True)
    nirf_rank_category = models.CharField(max_length=50, blank=True)
    nirf_rank_year = models.PositiveSmallIntegerField(null=True, blank=True)

    avg_rating = models.DecimalField(
        max_digits=3, decimal_places=2, default=0, db_index=True
    )
    total_reviews = models.PositiveIntegerField(default=0)
    total_brochure_downloads = models.PositiveIntegerField(default=0)

    campus_size_acres = models.DecimalField(
        max_digits=8, decimal_places=2, null=True, blank=True
    )
    total_departments = models.PositiveSmallIntegerField(null=True, blank=True)
    total_faculty = models.PositiveSmallIntegerField(null=True, blank=True)
    phd_faculty_percentage = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, blank=True
    )
    student_faculty_ratio = models.CharField(
        max_length=20, blank=True, help_text="e.g. 15:1"
    )
    total_students = models.PositiveIntegerField(null=True, blank=True)
    international_students = models.PositiveSmallIntegerField(null=True, blank=True)
    total_research_papers = models.PositiveIntegerField(null=True, blank=True)

    min_fee_per_year = models.PositiveIntegerField(
        null=True, blank=True, db_index=True
    )
    max_fee_per_year = models.PositiveIntegerField(
        null=True, blank=True, db_index=True
    )

    facilities = models.ManyToManyField(
        Facility, through="CollegeFacilityMapping", blank=True
    )

    facebook_url = models.URLField(blank=True)
    instagram_url = models.URLField(blank=True)
    twitter_url = models.URLField(blank=True)
    youtube_url = models.URLField(blank=True)
    linkedin_url = models.URLField(blank=True)

    status = models.CharField(
        max_length=20, choices=Status.choices, default=Status.DRAFT, db_index=True
    )
    is_featured = models.BooleanField(default=False, db_index=True)
    is_premium = models.BooleanField(
        default=False, help_text="College is a paying partner"
    )
    is_claimed = models.BooleanField(
        default=False, help_text="College has claimed their profile"
    )
    priority_score = models.PositiveSmallIntegerField(
        default=0,
        db_index=True,
        help_text="Manual boost for listing order; higher = earlier",
    )
    published_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = "colleges"
        ordering = ["-priority_score", "nirf_ranking", "name"]
        indexes = [
            models.Index(fields=["status", "is_featured"]),
            models.Index(fields=["state", "city", "status"]),
            models.Index(fields=["college_type", "ownership_type", "status"]),
            models.Index(fields=["naac_grade"]),
            models.Index(fields=["min_fee_per_year", "max_fee_per_year"]),
            models.Index(fields=["avg_rating", "total_reviews"]),
            models.Index(fields=["nirf_ranking"]),
            models.Index(fields=["is_aicte_approved", "is_ugc_recognized"]),
        ]

    def save(self, *args, **kwargs):
        if not self.slug:
            city_part = self.city.name if self.city else ""
            self.slug = slugify(f"{self.name} {city_part}")
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class CollegeFacilityMapping(models.Model):
    college = models.ForeignKey(College, on_delete=models.CASCADE)
    facility = models.ForeignKey(Facility, on_delete=models.CASCADE)
    details = models.CharField(
        max_length=255,
        blank=True,
        help_text="Quantity or extra info, e.g. '2 swimming pools'",
    )
    is_available = models.BooleanField(default=True)

    class Meta:
        db_table = "college_facility_mappings"
        unique_together = ("college", "facility")


class CollegeMedia(BaseModel):
    """
    Images, videos, and virtual-tour links for a college.
    BaseModel → UUID pk + created_at + updated_at.
    """

    class MediaType(models.TextChoices):
        IMAGE = "image", "Image"
        VIDEO = "video", "Video"
        VIRTUAL_TOUR = "virtual_tour", "Virtual Tour (360°)"
        DOCUMENT = "document", "Document"

    class MediaCategory(models.TextChoices):
        CAMPUS = "campus", "Campus"
        HOSTEL = "hostel", "Hostel"
        LAB = "lab", "Laboratory"
        LIBRARY = "library", "Library"
        SPORTS = "sports", "Sports"
        EVENT = "event", "Events"
        PLACEMENT = "placement", "Placements"
        CAFETERIA = "cafeteria", "Cafeteria"
        CLASSROOM = "classroom", "Classroom"
        OTHER = "other", "Other"

    college = models.ForeignKey(College, on_delete=models.CASCADE, related_name="media")
    media_type = models.CharField(max_length=20, choices=MediaType.choices)
    category = models.CharField(
        max_length=20, choices=MediaCategory.choices, default=MediaCategory.CAMPUS
    )
    file = models.FileField(upload_to="colleges/media/%Y/%m/", null=True, blank=True)
    url = models.URLField(
        blank=True, help_text="External URL (YouTube, Maps 360, etc.)"
    )
    thumbnail = models.ImageField(
        upload_to="colleges/thumbnails/", null=True, blank=True
    )
    caption = models.CharField(max_length=255, blank=True)
    alt_text = models.CharField(max_length=255, blank=True)
    is_primary = models.BooleanField(default=False)
    display_order = models.PositiveSmallIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = "college_media"
        ordering = ["display_order", "-created_at"]
        indexes = [models.Index(fields=["college", "media_type", "is_active"])]


class Accreditation(BaseModel):
    class AccreditationBody(models.TextChoices):
        NAAC = "naac", "NAAC"
        NBA = "nba", "NBA"
        ABET = "abet", "ABET"
        AACSB = "aacsb", "AACSB"
        EQUIS = "equis", "EQUIS"
        ISO = "iso", "ISO"
        OTHER = "other", "Other"

    college = models.ForeignKey(
        College, on_delete=models.CASCADE, related_name="accreditations"
    )
    body = models.CharField(max_length=20, choices=AccreditationBody.choices)
    grade = models.CharField(max_length=10, blank=True)
    cgpa = models.DecimalField(max_digits=4, decimal_places=2, null=True, blank=True)
    accredited_on = models.DateField(null=True, blank=True)
    valid_until = models.DateField(null=True, blank=True)
    certificate_number = models.CharField(max_length=100, blank=True)
    cycle = models.PositiveSmallIntegerField(
        null=True, blank=True, help_text="Assessment cycle number"
    )
    peer_team_report_url = models.URLField(blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = "accreditations"
        indexes = [models.Index(fields=["college", "body", "is_active"])]

    def __str__(self):
        return f"{self.college.name} — {self.get_body_display()} {self.grade}"


class Approval(BaseModel):
    class ApprovalBody(models.TextChoices):
        AICTE = "aicte", "AICTE"
        UGC = "ugc", "UGC"
        NMC = "nmc", "NMC (National Medical Commission)"
        BCI = "bci", "BCI (Bar Council of India)"
        PCI = "pci", "PCI (Pharmacy Council)"
        DCI = "dci", "DCI (Dental Council)"
        COA = "coa", "COA (Council of Architecture)"
        NCTE = "ncte", "NCTE (Teacher Education)"
        INC = "inc", "INC (Indian Nursing Council)"
        RCI = "rci", "RCI (Rehabilitation Council)"
        OTHER = "other", "Other"

    college = models.ForeignKey(
        College, on_delete=models.CASCADE, related_name="approvals"
    )
    body = models.CharField(max_length=20, choices=ApprovalBody.choices)
    approval_number = models.CharField(max_length=100, blank=True)
    approved_on = models.DateField(null=True, blank=True)
    valid_until = models.DateField(null=True, blank=True)
    document = models.FileField(upload_to="approvals/", null=True, blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = "approvals"

    def __str__(self):
        return f"{self.college.name} — {self.get_body_display()}"

class NIRFRanking(UUIDModel):
    class NIRFCategory(models.TextChoices):
        OVERALL = "overall", "Overall"
        UNIVERSITIES = "universities", "Universities"
        ENGINEERING = "engineering", "Engineering"
        MANAGEMENT = "management", "Management"
        PHARMACY = "pharmacy", "Pharmacy"
        MEDICAL = "medical", "Medical"
        ARCHITECTURE = "architecture", "Architecture"
        LAW = "law", "Law"
        DENTAL = "dental", "Dental"
        RESEARCH = "research", "Research"
        INNOVATION = "innovation", "Innovation (Atal)"

    college = models.ForeignKey(
        College, on_delete=models.CASCADE, related_name="nirf_rankings"
    )
    year = models.PositiveSmallIntegerField(db_index=True)
    category = models.CharField(max_length=20, choices=NIRFCategory.choices)
    rank = models.PositiveSmallIntegerField()
    score = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)

    class Meta:
        db_table = "nirf_rankings"
        unique_together = ("college", "year", "category")
        indexes = [models.Index(fields=["year", "category", "rank"])]

    def __str__(self):
        return f"{self.college.name} — NIRF {self.category} {self.year}: #{self.rank}"


class OtherRanking(UUIDModel):
    """Times Higher Education, QS World, India Today, Outlook, Careers360, etc."""

    college = models.ForeignKey(
        College, on_delete=models.CASCADE, related_name="other_rankings"
    )
    ranking_body = models.CharField(max_length=150)
    category = models.CharField(max_length=100, blank=True)
    year = models.PositiveSmallIntegerField()
    rank = models.PositiveSmallIntegerField()
    rank_out_of = models.PositiveIntegerField(null=True, blank=True)
    score = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    source_url = models.URLField(blank=True)

    class Meta:
        db_table = "other_rankings"
        indexes = [models.Index(fields=["college", "year"])]


class PlacementStatistics(BaseModel):
    college = models.ForeignKey(
        College, on_delete=models.CASCADE, related_name="placement_stats"
    )
    year = models.PositiveSmallIntegerField(db_index=True)
    batch = models.CharField(max_length=20, blank=True, help_text="e.g. 2023–2024")
    department = models.CharField(
        max_length=100,
        blank=True,
        help_text="Leave blank for overall; set for dept-wise stat",
    )
    total_students_eligible = models.PositiveSmallIntegerField(null=True, blank=True)
    total_students_placed = models.PositiveSmallIntegerField(null=True, blank=True)
    total_offers = models.PositiveSmallIntegerField(null=True, blank=True)
    placement_percentage = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, blank=True
    )
    avg_package_lpa = models.DecimalField(
        max_digits=6, decimal_places=2, null=True, blank=True, db_index=True
    )
    median_package_lpa = models.DecimalField(
        max_digits=6, decimal_places=2, null=True, blank=True
    )
    highest_package_lpa = models.DecimalField(
        max_digits=6, decimal_places=2, null=True, blank=True, db_index=True
    )
    lowest_package_lpa = models.DecimalField(
        max_digits=6, decimal_places=2, null=True, blank=True
    )
    international_offers = models.PositiveSmallIntegerField(null=True, blank=True)
    highest_international_package_lpa = models.DecimalField(
        max_digits=6, decimal_places=2, null=True, blank=True
    )
    total_companies_visited = models.PositiveSmallIntegerField(null=True, blank=True)
    top_recruiters_snapshot = models.JSONField(default=list, blank=True)
    is_verified = models.BooleanField(default=False)
    source = models.CharField(max_length=255, blank=True)

    class Meta:
        db_table = "placement_statistics"
        unique_together = ("college", "year", "department")
        ordering = ["-year"]
        indexes = [models.Index(fields=["college", "year"])]

    def __str__(self):
        return f"{self.college.name} — Placements {self.year}"


class TopRecruiter(UUIDModel):
    """Companies that visit for campus placements — UUIDModel (no audit needed)."""

    college = models.ForeignKey(
        College, on_delete=models.CASCADE, related_name="top_recruiters"
    )
    company_name = models.CharField(max_length=255)
    company_logo = models.ImageField(
        upload_to="recruiters/logos/", null=True, blank=True
    )
    sector = models.CharField(max_length=100, blank=True)
    avg_package_lpa = models.DecimalField(
        max_digits=6, decimal_places=2, null=True, blank=True
    )
    year = models.PositiveSmallIntegerField(null=True, blank=True)
    display_order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        db_table = "top_recruiters"
        ordering = ["display_order", "company_name"]


class ScholarshipScheme(BaseModel):
    class ScholarshipType(models.TextChoices):
        MERIT = "merit", "Merit-Based"
        NEED = "need", "Need-Based"
        CATEGORY = "category", "Category-Based (SC/ST/OBC)"
        SPORTS = "sports", "Sports"
        MANAGEMENT = "management", "Management Quota"
        GOVT = "govt", "Government (Central / State)"
        MINORITY = "minority", "Minority"
        ALUMNI = "alumni", "Alumni-Funded"
        OTHER = "other", "Other"

    college = models.ForeignKey(
        College, on_delete=models.CASCADE, related_name="scholarships"
    )
    name = models.CharField(max_length=255)
    scholarship_type = models.CharField(max_length=20, choices=ScholarshipType.choices)
    description = models.TextField(blank=True)
    eligibility = models.TextField(blank=True)
    amount = models.PositiveIntegerField(
        null=True, blank=True, help_text="Amount in INR per year"
    )
    amount_description = models.CharField(
        max_length=255, blank=True, help_text="e.g. 'Up to 100% fee waiver'"
    )
    percentage_waiver = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        null=True,
        blank=True,
        validators=[MinValueValidator(0), MaxValueValidator(100)],
    )
    application_deadline = models.DateField(null=True, blank=True)
    renewable = models.BooleanField(default=False)
    renewal_criteria = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = "scholarship_schemes"

class HostelDetail(BaseModel):
    class HostelType(models.TextChoices):
        BOYS = "boys", "Boys Hostel"
        GIRLS = "girls", "Girls Hostel"
        MIXED = "mixed", "Mixed (Separate Floors / Wings)"

    college = models.ForeignKey(
        College, on_delete=models.CASCADE, related_name="hostel_details"
    )
    hostel_type = models.CharField(max_length=10, choices=HostelType.choices)
    hostel_name = models.CharField(max_length=150, blank=True)
    total_seats = models.PositiveSmallIntegerField(null=True, blank=True)
    room_fee_structure = models.JSONField(default=list, blank=True)
    mess_fee_monthly = models.PositiveIntegerField(null=True, blank=True)
    security_deposit = models.PositiveIntegerField(null=True, blank=True)
    is_ac_available = models.BooleanField(default=False)
    has_wifi = models.BooleanField(default=True)
    has_gym = models.BooleanField(default=False)
    has_mess = models.BooleanField(default=True)
    mess_type = models.CharField(
        max_length=50, blank=True, help_text="Veg / Non-Veg / Both"
    )
    warden_contact = models.CharField(max_length=20, blank=True)
    distance_from_college_km = models.DecimalField(
        max_digits=4, decimal_places=1, null=True, blank=True
    )
    is_on_campus = models.BooleanField(default=True)
    additional_info = models.TextField(blank=True)

    class Meta:
        db_table = "hostel_details"


class CollegeEntranceExam(models.Model):
    """Which entrance exams a college accepts for admission."""

    college = models.ForeignKey(
        College, on_delete=models.CASCADE, related_name="accepted_exams"
    )
    exam = models.ForeignKey(
        EntranceExam, on_delete=models.CASCADE, related_name="accepting_colleges"
    )
    is_mandatory = models.BooleanField(default=False)
    weightage_percentage = models.PositiveSmallIntegerField(
        null=True, blank=True, help_text="How much the exam score is weighted"
    )
    notes = models.CharField(max_length=255, blank=True)

    class Meta:
        db_table = "college_entrance_exams"
        unique_together = ("college", "exam")


class CategoryCutoff(UUIDModel):
    """Year-wise, category-wise, round-wise cutoffs for admission."""

    class Category(models.TextChoices):
        GENERAL = "general", "General / UR"
        OBC = "obc", "OBC"
        OBC_NCL = "obc_ncl", "OBC-NCL"
        SC = "sc", "SC"
        ST = "st", "ST"
        EWS = "ews", "EWS"
        PWD = "pwd", "PwD (Differently Abled)"
        NRI = "nri", "NRI"
        MANAGEMENT = "management", "Management Quota"
        FOREIGN = "foreign", "Foreign National"

    class CutoffType(models.TextChoices):
        RANK = "rank", "Rank"
        PERCENTILE = "percentile", "Percentile"
        MARKS = "marks", "Marks"

    college = models.ForeignKey(
        College, on_delete=models.CASCADE, related_name="cutoffs"
    )
    course = models.ForeignKey(
        "courses.Course",
        on_delete=models.CASCADE,
        related_name="cutoffs",
        null=True,
        blank=True,
    )
    exam = models.ForeignKey(
        EntranceExam, on_delete=models.SET_NULL, null=True, related_name="cutoffs"
    )
    year = models.PositiveSmallIntegerField(db_index=True)
    category = models.CharField(max_length=20, choices=Category.choices)
    round_number = models.PositiveSmallIntegerField(
        null=True, blank=True, help_text="Counselling round number"
    )
    cutoff_type = models.CharField(
        max_length=15, choices=CutoffType.choices, default=CutoffType.RANK
    )
    opening_rank = models.PositiveIntegerField(null=True, blank=True)
    closing_rank = models.PositiveIntegerField(null=True, blank=True)
    cutoff_value = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True
    )
    is_state_quota = models.BooleanField(
        default=False, help_text="State quota vs All-India quota"
    )

    class Meta:
        db_table = "category_cutoffs"
        indexes = [
            models.Index(fields=["college", "year", "category"]),
            models.Index(fields=["exam", "year"]),
            models.Index(fields=["course", "year", "category"]),
        ]


class AdmissionProcess(BaseModel):
    """Ordered steps describing how to apply to a college."""

    college = models.ForeignKey(
        College, on_delete=models.CASCADE, related_name="admission_steps"
    )
    step_number = models.PositiveSmallIntegerField()
    title = models.CharField(max_length=255)
    description = models.TextField()
    is_online = models.BooleanField(default=True)

    class Meta:
        db_table = "admission_processes"
        ordering = ["step_number"]
        unique_together = ("college", "step_number")


class ImportantDate(UUIDModel):
    class DateType(models.TextChoices):
        APPLICATION_START = "app_start", "Application Start"
        APPLICATION_END = "app_end", "Application End"
        EXAM_DATE = "exam_date", "Exam Date"
        RESULT_DATE = "result_date", "Result Date"
        COUNSELLING_START = "counselling_start", "Counselling Start"
        COUNSELLING_END = "counselling_end", "Counselling End"
        ADMISSION_START = "admission_start", "Admission Start"
        ADMISSION_END = "admission_end", "Admission End"
        CLASSES_START = "classes_start", "Classes Start"
        FEE_PAYMENT = "fee_payment", "Fee Payment Deadline"
        DOCUMENT_VERIFICATION = "doc_verify", "Document Verification"

    college = models.ForeignKey(
        College, on_delete=models.CASCADE, related_name="important_dates"
    )
    exam = models.ForeignKey(
        EntranceExam, on_delete=models.SET_NULL, null=True, blank=True
    )
    date_type = models.CharField(max_length=25, choices=DateType.choices)
    label = models.CharField(max_length=255)
    date = models.DateField()
    year = models.PositiveSmallIntegerField()
    description = models.TextField(blank=True)
    is_tentative = models.BooleanField(default=False)

    class Meta:
        db_table = "important_dates"
        ordering = ["date"]
        indexes = [models.Index(fields=["college", "year"])]


class Brochure(BaseModel):
    class BrochureType(models.TextChoices):
        COLLEGE = "college", "College Brochure"
        COURSE = "course", "Course Brochure"
        HOSTEL = "hostel", "Hostel Brochure"
        PLACEMENT = "placement", "Placement Report"
        SCHOLARSHIP = "scholarship", "Scholarship Info"
        PROSPECTUS = "prospectus", "Full Prospectus"

    college = models.ForeignKey(
        College, on_delete=models.CASCADE, related_name="brochures"
    )
    course = models.ForeignKey(
        "courses.Course",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="brochures",
    )
    brochure_type = models.CharField(
        max_length=20, choices=BrochureType.choices, default=BrochureType.COLLEGE
    )
    title = models.CharField(max_length=255)
    file = models.FileField(upload_to="brochures/%Y/")
    academic_year = models.CharField(
        max_length=10, blank=True, help_text="e.g. 2024-25"
    )
    file_size_kb = models.PositiveIntegerField(null=True, blank=True)
    total_downloads = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True, db_index=True)

    class Meta:
        db_table = "brochures"
        indexes = [models.Index(fields=["college", "is_active"])]

    def __str__(self):
        return f"{self.college.name} — {self.title}"
