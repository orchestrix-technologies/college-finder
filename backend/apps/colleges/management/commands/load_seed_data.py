"""
load_seed_data — Django management command
==========================================
Loads all seed CSVs from backend/data/seed/ into the database.

Usage:
    python manage.py load_seed_data                    # upsert everything
    python manage.py load_seed_data --fresh            # wipe then reload
    python manage.py load_seed_data --dry-run          # simulate, no commit
    python manage.py load_seed_data --only colleges exams courses
"""

import csv

from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand
from django.db import transaction
from django.utils.text import slugify

from apps.colleges.models import (
    AdmissionProcess,
    City,
    College,
    CollegeEntranceExam,
    CollegeFacilityMapping,
    Country,
    EntranceExam,
    Facility,
    HostelDetail,
    OtherRanking,
    PlacementStatistics,
    ScholarshipScheme,
    State,
    TopRecruiter,
)
from apps.courses.models import (
    Course,
    CourseEntranceExam,
    CoursePlacementStat,
    Department,
    DegreeLevel,
    DegreeType,
)
from apps.reviews.models import Review

User = get_user_model()
SEED_DIR = settings.BASE_DIR / "data" / "seed"

# --CSV helpers --─────────────────────────────────────────────────────────────

def _read(filename):
    with open(SEED_DIR / filename, encoding="utf-8", newline="") as f:
        return list(csv.DictReader(f))


def _bool(v):
    return str(v).strip().lower() in ("true", "1", "yes")


def _int(v, default=None):
    s = str(v).strip().replace(",", "") if v is not None else ""
    try:
        return int(s) if s else default
    except ValueError:
        return default


def _dec(v, default=None):
    s = str(v).strip() if v is not None else ""
    try:
        return float(s) if s else default
    except ValueError:
        return default


# --Reference mappings --──────────────────────────────────────────────────────

DEGREE_LEVEL_META = {
    "UG":         ("ug",          "Undergraduate (UG)",  1),
    "PG":         ("pg",          "Postgraduate (PG)",   2),
    "PhD":        ("phd",         "Doctorate (PhD)",     3),
    "Diploma":    ("diploma",     "Diploma",             4),
    "Integrated": ("integrated",  "Integrated (UG+PG)",  5),
}

EXAM_META = {
    "JEE Main":            ("national",  "engineering", "online"),
    "JEE Advanced":        ("national",  "engineering", "offline"),
    "GATE":                ("national",  "engineering", "online"),
    "NEET-UG":             ("national",  "medical",     "offline"),
    "NEET-PG":             ("national",  "medical",     "online"),
    "AIIMS-PG":            ("institute", "medical",     "online"),
    "CAT":                 ("national",  "management",  "online"),
    "GMAT":                ("national",  "management",  "online"),
    "GRE":                 ("national",  "other",       "online"),
    "BITSAT":              ("institute", "engineering", "online"),
    "VITEEE":              ("institute", "engineering", "online"),
    "VITMEE":              ("institute", "engineering", "online"),
    "JAM":                 ("national",  "science",     "online"),
    "CEED":                ("national",  "design",      "online"),
    "KVPY":                ("national",  "science",     "offline"),
    "CSIR-NET":            ("national",  "science",     "online"),
    "JEST":                ("national",  "science",     "online"),
    "TIFR-GS":             ("institute", "science",     "offline"),
    "NIMCET":              ("national",  "engineering", "online"),
    "XAT":                 ("national",  "management",  "online"),
    "VIT MBA Exam":        ("institute", "management",  "online"),
    "SAT (International)": ("national",  "other",       "online"),
}

COLLEGE_TYPE_MAP = {
    "Engineering":        "engineering",
    "Science & Engineering": "multi_discipline",
    "Medical":            "medical",
    "Management":         "management",
    "Arts & Science":     "arts_science",
    "Multi-Discipline":   "multi_discipline",
}

OWNERSHIP_MAP = {
    "Government":      "government",
    "Private":         "private",
    "Deemed Private":  "deemed",
    "Government Aided":"govt_aided",
    "Autonomous":      "autonomous",
}

GENDER_MAP = {
    "Co-Ed":      "co_ed",
    "Boys Only":  "boys",
    "Girls Only": "girls",
}

FACILITY_CAT_MAP = {
    "Academic":   "academic",  "Sports":     "sports",
    "Hostel":     "hostel",    "Medical":    "medical",
    "Transport":  "transport", "Recreation": "recreation",
    "Technology": "technology","Dining":     "dining",
    "Library":    "library",   "Banking":    "banking",
}

SCHOLARSHIP_TYPE_MAP = {
    "Merit + Need": "merit",
    "Need":         "need",
    "Merit":        "merit",
    "Category":     "category",
    "Sports":       "sports",
}

HOSTEL_TYPE_MAP = {"Boys": "boys", "Girls": "girls", "Mixed": "mixed"}

# Degree types that override college-level department inference
DEGREE_TYPE_DEPT_OVERRIDE = {
    "MBA": "Management", "MBA (PGP)": "Management", "PGPX": "Management",
    "MBBS": "Medical", "M.D.": "Medical", "M.S.": "Medical",
}

COLLEGE_TYPE_TO_DEPT = {
    "engineering":     "Engineering",
    "medical":         "Medical",
    "management":      "Management",
    "multi_discipline":"Science & Engineering",
    "arts_science":    "Arts & Science",
}


# --Command --─────────────────────────────────────────────────────────────────

class Command(BaseCommand):
    help = "Load seed CSV data into the DB (upsert by default)"

    SECTIONS = [
        "colleges", "alumni", "exams", "courses", "placements",
        "recruiters", "facilities", "hostels", "scholarships",
        "rankings", "admissions", "reviews",
    ]

    def add_arguments(self, parser):
        parser.add_argument(
            "--fresh",
            action="store_true",
            help="Wipe ALL existing data before loading (irreversible in non-dry-run)",
        )
        parser.add_argument(
            "--dry-run",
            action="store_true",
            help="Simulate every write inside a transaction then roll back — no DB changes",
        )
        parser.add_argument(
            "--only",
            nargs="+",
            choices=self.SECTIONS,
            metavar="SECTION",
            help="Load only specific sections: " + " | ".join(self.SECTIONS),
        )

    def handle(self, *args, **options):
        self.dry = options["dry_run"]
        self.sections = set(options["only"] or self.SECTIONS)
        self.counts = {"created": 0, "updated": 0}

        if self.dry:
            self.stdout.write(self.style.WARNING("DRY RUN — all writes rolled back at end\n"))

        with transaction.atomic():
            if options["fresh"]:
                self._wipe()
            self._run()
            if self.dry:
                transaction.set_rollback(True)

        status = "Dry-run complete (rolled back)." if self.dry else "Seed loaded."
        self.stdout.write(self.style.SUCCESS(
            f"\n{status}  created={self.counts['created']}  updated={self.counts['updated']}"
        ))

    # --Wipe --────────────────────────────────────────────────────────────────

    def _wipe(self):
        self.stdout.write(self.style.WARNING("Wiping all data…"))
        # Seed users first so Review cascade happens before College cascade
        deleted, _ = User.objects.filter(email__endswith="@seed.local").delete()
        self.stdout.write(f"  deleted {deleted} seed users (+ their reviews via cascade)")
        deleted, _ = College.objects.all().delete()
        self.stdout.write(f"  deleted {deleted} college rows (cascades courses, placements, etc.)")
        EntranceExam.objects.all().delete()
        Facility.objects.all().delete()
        DegreeLevel.objects.all().delete()   # cascades DegreeType
        Department.objects.all().delete()
        City.objects.all().delete()
        State.objects.all().delete()
        Country.objects.all().delete()
        self.stdout.write(self.style.WARNING("Wipe done.\n"))

    # --Upsert helper --───────────────────────────────────────────────────────

    def _upsert(self, model, lookup, defaults, label):
        obj, created = model.objects.update_or_create(**lookup, defaults=defaults)
        key = "created" if created else "updated"
        self.counts[key] += 1
        marker = self.style.SUCCESS("+") if created else self.style.WARNING("~")
        self.stdout.write(f"  {marker} {label}")
        return obj, created

    # --Orchestrator --────────────────────────────────────────────────────────

    def _run(self):
        college_map = self._build_college_map()

        if "alumni"     in self.sections: self._load_alumni(college_map)
        if "exams"      in self.sections: self._load_exams(college_map)
        if "courses"    in self.sections: self._load_courses(college_map)
        if "placements" in self.sections: self._load_placements(college_map)
        if "recruiters" in self.sections: self._load_recruiters(college_map)
        if "facilities" in self.sections: self._load_facilities(college_map)
        if "hostels"    in self.sections: self._load_hostels(college_map)
        if "scholarships" in self.sections: self._load_scholarships(college_map)
        if "rankings"   in self.sections: self._load_rankings(college_map)
        if "admissions" in self.sections: self._load_admissions(college_map)
        if "reviews"    in self.sections: self._load_reviews(college_map)

    def _build_college_map(self):
        """
        Returns {csv_id_str: College} — loads colleges from CSV if in sections,
        otherwise looks up existing DB rows by slug so --only sub-sections work.
        """
        if "colleges" in self.sections:
            return self._load_colleges()

        college_map = {}
        for row in _read("colleges.csv"):
            try:
                college_map[row["id"]] = College.objects.get(slug=row["slug"])
            except College.DoesNotExist:
                self.stdout.write(self.style.WARNING(
                    f"  [!] College '{row['slug']}' not in DB — run without --only or add 'colleges' to --only"
                ))
        return college_map

    # --Section loaders --─────────────────────────────────────────────────────

    def _load_colleges(self):
        self.stdout.write("\n--Colleges --")
        india, _ = Country.objects.get_or_create(
            code="IN", defaults={"name": "India", "is_active": True}
        )
        college_map = {}

        for row in _read("colleges.csv"):
            state_obj, _ = State.objects.get_or_create(
                country=india, name=row["state"],
                defaults={"code": "", "is_active": True},
            )
            city_obj, _ = City.objects.get_or_create(
                state=state_obj, name=row["city"],
                defaults={"is_active": True},
            )

            college, created = self._upsert(
                College,
                lookup={"slug": row["slug"]},
                defaults={
                    "name":                  row["name"],
                    "short_name":            row["short_name"],
                    "college_type":          COLLEGE_TYPE_MAP.get(row["college_type"], "engineering"),
                    "ownership_type":        OWNERSHIP_MAP.get(row["ownership_type"], "government"),
                    "gender_type":           GENDER_MAP.get(row["gender_type"], "co_ed"),
                    "country":               india,
                    "state":                 state_obj,
                    "city":                  city_obj,
                    "address":               row["address"],
                    "established_year":      _int(row["established_year"]),
                    "website":               row["website"],
                    "phone":                 row["phone"],
                    "email":                 row["email"],
                    "logo_color":            row["logo_color"],
                    "logo_initials":         row["logo_initials"],
                    "cover_image_url":       row["cover_image_url"],
                    "about_short":           row["about_short"],
                    "description":           row["description"],
                    "vision":                row["vision"],
                    "mission":               row["mission"],
                    "naac_grade":            row["naac_grade"],
                    "naac_cgpa":             _dec(row["naac_cgpa"]),
                    "naac_accredited_year":  _int(row["naac_year"]),
                    "is_nba_accredited":     _bool(row["is_nba"]),
                    "is_aicte_approved":     _bool(row["is_aicte"]),
                    "is_ugc_recognized":     _bool(row["is_ugc"]),
                    "nirf_ranking":          _int(row["nirf_ranking"]),
                    "nirf_rank_category":    row["nirf_category"],
                    "nirf_rank_year":        _int(row["nirf_year"]),
                    "avg_rating":            _dec(row["avg_rating"], 0),
                    "total_reviews":         _int(row["total_reviews"], 0),
                    "campus_size_acres":     _dec(row["campus_size_acres"]),
                    "total_faculty":         _int(row["total_faculty"]),
                    "phd_faculty_percentage":_dec(row["phd_faculty_percent"]),
                    "student_faculty_ratio": row["student_faculty_ratio"],
                    "total_students":        _int(row["total_students"]),
                    "total_departments":     _int(row["total_departments"]),
                    "international_students":_int(row["international_students"]),
                    "min_fee_per_year":      _int(row["min_fee_per_year"]),
                    "max_fee_per_year":      _int(row["max_fee_per_year"]),
                    "is_featured":           _bool(row["is_featured"]),
                    "is_premium":            _bool(row["is_premium"]),
                    "facebook_url":          row.get("facebook_url", ""),
                    "instagram_url":         row.get("instagram_url", ""),
                    "linkedin_url":          row.get("linkedin_url", ""),
                    "youtube_url":           row.get("youtube_url", ""),
                    "status":                College.Status.PUBLISHED,
                },
                label=f"College: {row['name']}",
            )
            college_map[row["id"]] = college

        return college_map

    def _load_alumni(self, college_map):
        self.stdout.write("\n--Notable Alumni --")
        grouped = {}
        for row in _read("notable_alumni.csv"):
            grouped.setdefault(row["college_id"], []).append({
                "name":        row["name"],
                "achievement": row["achievement"],
                "year":        _int(row["year"]),
            })
        for cid, alumni_list in grouped.items():
            college = college_map.get(cid)
            if not college:
                continue
            college.notable_alumni = alumni_list
            college.save(update_fields=["notable_alumni"])
            self.counts["updated"] += 1
            self.stdout.write(f"  ~ Notable alumni: {college.short_name} ({len(alumni_list)} entries)")

    def _load_exams(self, college_map):
        self.stdout.write("\n--Entrance Exams --")
        exam_map = {}

        # Create EntranceExam records (deduplicated)
        for row in _read("entrance_exams.csv"):
            name = row["exam_name"].strip()
            if name in exam_map:
                continue
            meta = EXAM_META.get(name, ("national", "other", "online"))
            exam, _ = self._upsert(
                EntranceExam,
                lookup={"name": name},
                defaults={
                    "full_name":   name,
                    "stream":      meta[1],
                    "exam_level":  meta[0],
                    "exam_mode":   meta[2],
                    "is_active":   True,
                },
                label=f"Exam: {name}",
            )
            exam_map[name] = exam

        # Create College <->EntranceExam links
        for row in _read("entrance_exams.csv"):
            college = college_map.get(row["college_id"])
            exam = exam_map.get(row["exam_name"].strip())
            if not college or not exam:
                continue
            self._upsert(
                CollegeEntranceExam,
                lookup={"college": college, "exam": exam},
                defaults={},
                label=f"CollegeExam: {college.short_name} <->{exam.name}",
            )

        return exam_map

    def _load_courses(self, college_map):
        self.stdout.write("\n--Courses --")

        # Pre-build reference objects from course rows
        dl_map, dt_map, dept_map = {}, {}, {}
        exam_map = {e.name: e for e in EntranceExam.objects.all()}

        for row in _read("courses.csv"):
            dl_str = row["degree_level"]
            if dl_str not in dl_map:
                meta = DEGREE_LEVEL_META.get(dl_str, ("ug", dl_str, 99))
                dl, _ = DegreeLevel.objects.get_or_create(
                    level=meta[0], defaults={"name": meta[1], "display_order": meta[2]}
                )
                dl_map[dl_str] = dl

            dt_str = row["degree_type"]
            if dt_str not in dt_map:
                dt, _ = DegreeType.objects.get_or_create(
                    short_name=dt_str,
                    defaults={"name": dt_str, "degree_level": dl_map[dl_str], "is_active": True},
                )
                dt_map[dt_str] = dt

            dept_name = self._infer_dept(row, college_map)
            if dept_name not in dept_map:
                dept, _ = Department.objects.get_or_create(
                    name=dept_name, defaults={"is_active": True}
                )
                dept_map[dept_name] = dept

        # Create Course objects
        for row in _read("courses.csv"):
            college = college_map.get(row["college_id"])
            if not college:
                continue

            try:
                duration_years = int(float(row["duration"].split()[0]))
            except (ValueError, IndexError):
                duration_years = 4

            dept_name = self._infer_dept(row, college_map)

            course, _ = self._upsert(
                Course,
                lookup={"college": college, "name": row["name"]},
                defaults={
                    "degree_level":  dl_map[row["degree_level"]],
                    "degree_type":   dt_map[row["degree_type"]],
                    "department":    dept_map[dept_name],
                    "mode":          "full_time",
                    "duration_years":duration_years,
                    "total_fee":     _int(row["total_fee"]),
                    "fee_per_year":  _int(row["fee_per_year"]),
                    "total_intake":  _int(row["total_seats"]),
                    "status":        Course.Status.PUBLISHED,
                },
                label=f"Course: {college.short_name} — {row['name']}",
            )

            # Course-level placement stat
            avg_pkg = _dec(row.get("avg_package_lpa"))
            if avg_pkg is not None:
                self._upsert(
                    CoursePlacementStat,
                    lookup={"course": course, "year": 2024},
                    defaults={
                        "avg_package_lpa":      avg_pkg,
                        "highest_package_lpa":  _dec(row.get("highest_package_lpa")),
                        "placement_percentage": _dec(row.get("placement_percentage")),
                    },
                    label=f"  CoursePlacement: {row['name']} 2024",
                )

            # Course <->EntranceExam links
            for exam_name in row.get("exams_accepted", "").split(","):
                exam_name = exam_name.strip()
                if not exam_name:
                    continue
                if exam_name not in exam_map:
                    meta = EXAM_META.get(exam_name, ("national", "other", "online"))
                    exam, _ = EntranceExam.objects.get_or_create(
                        name=exam_name,
                        defaults={"full_name": exam_name, "stream": meta[1],
                                  "exam_level": meta[0], "exam_mode": meta[2]},
                    )
                    exam_map[exam_name] = exam
                self._upsert(
                    CourseEntranceExam,
                    lookup={"course": course, "exam": exam_map[exam_name]},
                    defaults={},
                    label=f"  CourseExam: {row['name']} <->{exam_name}",
                )

    def _load_placements(self, college_map):
        self.stdout.write("\n--Placement Stats --")
        for row in _read("placement_stats.csv"):
            college = college_map.get(row["college_id"])
            if not college:
                continue
            self._upsert(
                PlacementStatistics,
                lookup={"college": college, "year": _int(row["year"]), "department": ""},
                defaults={
                    "total_students_eligible":          _int(row["total_eligible"]),
                    "total_students_placed":            _int(row["total_placed"]),
                    "placement_percentage":             _dec(row["placement_percentage"]),
                    "avg_package_lpa":                  _dec(row["avg_package_lpa"]),
                    "median_package_lpa":               _dec(row["median_package_lpa"]),
                    "highest_package_lpa":              _dec(row["highest_package_lpa"]),
                    "total_companies_visited":          _int(row["total_companies"]),
                    "international_offers":             _int(row["international_offers"]),
                    "highest_international_package_lpa":_dec(row["highest_intl_package_lpa"]),
                },
                label=f"Placement: {college.short_name} {row['year']}",
            )

    def _load_recruiters(self, college_map):
        self.stdout.write("\n--Top Recruiters --")
        for row in _read("top_recruiters.csv"):
            college = college_map.get(row["college_id"])
            if not college:
                continue
            self._upsert(
                TopRecruiter,
                lookup={"college": college, "company_name": row["company_name"]},
                defaults={"display_order": _int(row["display_order"], 0)},
                label=f"Recruiter: {college.short_name} — {row['company_name']}",
            )

    def _load_facilities(self, college_map):
        self.stdout.write("\n--Facilities --")
        for row in _read("facilities.csv"):
            college = college_map.get(row["college_id"])
            if not college:
                continue
            cat = FACILITY_CAT_MAP.get(row["category"], "other")
            facility, _ = Facility.objects.get_or_create(
                name=row["name"],
                defaults={"category": cat, "icon": row["icon"], "is_active": True},
            )
            self._upsert(
                CollegeFacilityMapping,
                lookup={"college": college, "facility": facility},
                defaults={"is_available": True},
                label=f"Facility: {college.short_name} — {row['name']}",
            )

    def _load_hostels(self, college_map):
        self.stdout.write("\n--Hostels --")
        for row in _read("hostels.csv"):
            college = college_map.get(row["college_id"])
            if not college:
                continue
            amenities = [a.strip() for a in row["amenities"].split(",") if a.strip()]
            self._upsert(
                HostelDetail,
                lookup={
                    "college":      college,
                    "hostel_type":  HOSTEL_TYPE_MAP.get(row["type"], "boys"),
                    "hostel_name":  row["name"],
                },
                defaults={
                    "total_seats":     _int(row["total_seats"]),
                    "mess_fee_monthly":_int(row["fee_monthly"]),
                    "amenities":       amenities,
                    "is_on_campus":    _bool(row["is_on_campus"]),
                    "has_wifi":        "Wi-Fi" in row["amenities"],
                    "has_gym":         "Gym" in row["amenities"],
                    "has_mess":        "Mess" in row["amenities"],
                },
                label=f"Hostel: {college.short_name} — {row['name']}",
            )

    def _load_scholarships(self, college_map):
        self.stdout.write("\n--Scholarships --")
        for row in _read("scholarships.csv"):
            college = college_map.get(row["college_id"])
            if not college:
                continue
            self._upsert(
                ScholarshipScheme,
                lookup={"college": college, "name": row["name"]},
                defaults={
                    "scholarship_type": SCHOLARSHIP_TYPE_MAP.get(row["type"], "other"),
                    "amount":           _int(row["amount"]),
                    "amount_description":row["amount_desc"],
                    "eligibility":      row["eligibility"],
                    "renewable":        _bool(row["renewable"]),
                    "is_active":        True,
                },
                label=f"Scholarship: {college.short_name} — {row['name']}",
            )

    def _load_rankings(self, college_map):
        self.stdout.write("\n--Other Rankings --")
        for row in _read("other_rankings.csv"):
            college = college_map.get(row["college_id"])
            if not college:
                continue
            rank_out_of = _int(row.get("rank_out_of", ""))
            self._upsert(
                OtherRanking,
                lookup={
                    "college":      college,
                    "ranking_body": row["ranking_body"],
                    "year":         _int(row["year"]),
                    "category":     row["category"],
                },
                defaults={
                    "rank":         _int(row["rank"]),
                    "rank_out_of":  rank_out_of,
                },
                label=f"Ranking: {college.short_name} — {row['ranking_body']} {row['year']}",
            )

    def _load_admissions(self, college_map):
        self.stdout.write("\n--Admission Process --")
        for row in _read("admission_process.csv"):
            college = college_map.get(row["college_id"])
            if not college:
                continue
            self._upsert(
                AdmissionProcess,
                lookup={"college": college, "step_number": _int(row["step"])},
                defaults={
                    "title":       row["title"],
                    "description": row["description"],
                },
                label=f"Admission: {college.short_name} step {row['step']} — {row['title']}",
            )

    def _load_reviews(self, college_map):
        self.stdout.write("\n--Reviews --")
        for row in _read("reviews.csv"):
            college = college_map.get(row["college_id"])
            if not college:
                continue

            # Get or create a seed user per reviewer
            email = f"seed.{slugify(row['author'])}@seed.local"
            parts = row["author"].split(None, 1)
            user, _ = User.objects.get_or_create(
                email=email,
                defaults={
                    "first_name": parts[0],
                    "last_name":  parts[1] if len(parts) > 1 else "",
                    "is_active":  True,
                },
            )
            if not user.password:
                user.set_unusable_password()
                user.save(update_fields=["password"])

            self._upsert(
                Review,
                lookup={"college": college, "user": user},
                defaults={
                    "overall_rating":        _dec(row["overall_rating"], 3),
                    "placement_rating":      _int(row["placement_rating"]),
                    "faculty_rating":        _int(row["faculty_rating"]),
                    "infrastructure_rating": _int(row["infrastructure_rating"]),
                    "campus_life_rating":    _int(row["campus_life_rating"]),
                    "value_for_money_rating":_int(row["value_for_money_rating"]),
                    "title":                 row["title"],
                    "pros":                  row["pros"],
                    "cons":                  row["cons"],
                    "advice":                row["advice"],
                    "helpful_count":         _int(row["helpful_count"], 0),
                    "batch_year":            _int(row["batch"]),
                    "is_current_student":    _bool(row["is_current_student"]),
                    "program_studied":       row["program"],
                    "is_verified_student":   _bool(row["is_verified"]),
                    "status":                Review.Status.APPROVED,
                },
                label=f"Review: {college.short_name} by {row['author']}",
            )

    # --Helpers --─────────────────────────────────────────────────────────────

    def _infer_dept(self, row, college_map):
        """Infer department name from degree_type, falling back to college type."""
        dt = row.get("degree_type", "")
        if dt in DEGREE_TYPE_DEPT_OVERRIDE:
            return DEGREE_TYPE_DEPT_OVERRIDE[dt]
        college = college_map.get(row["college_id"])
        if college:
            return COLLEGE_TYPE_TO_DEPT.get(college.college_type, "Engineering")
        return "Engineering"
