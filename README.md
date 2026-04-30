# College Finder

A full-stack college and course discovery platform.

**Stack:** Django + DRF (backend) · PostgreSQL · React + TypeScript + Vite (frontend)

---

## Project Structure

```
college-finder/
├── backend/                  # Django project
│   ├── apps/
│   │   ├── users/            # Custom user model (email login)
│   │   ├── colleges/         # College listings
│   │   ├── courses/          # Course catalog
│   │   ├── reviews/          # User reviews
│   │   └── leads/            # Enquiry / lead capture
│   ├── config/
│   │   ├── settings/
│   │   │   ├── base.py
│   │   │   ├── dev.py
│   │   │   └── prod.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   │   └── asgi.py
│   ├── core/                 # Shared utilities (pagination, exception handler)
│   ├── requirements/
│   │   ├── base.txt
│   │   ├── dev.txt
│   │   └── prod.txt
│   └── .env.example
├── frontend/                 # React + TypeScript app
│   └── src/
│       ├── components/       # Reusable UI components
│       ├── pages/            # Route-level page components
│       ├── services/         # Axios API layer
│       ├── hooks/            # Custom React hooks
│       ├── types/            # Shared TypeScript types
│       └── utils/            # Helper utilities
├── docker-compose.yml
└── README.md
```

---

## Backend Setup

### Prerequisites
- Python 3.12+
- PostgreSQL 14+

### Steps

```bash
cd backend

# Create and activate virtual environment
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements/dev.txt

# Configure environment
cp .env.example .env
# Edit .env with your database credentials and secret key

# Create the PostgreSQL database
createdb college_finder          # or use pgAdmin / psql

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Start dev server
python manage.py runserver
```

The API will be available at `http://localhost:8000/api/v1/`.
Django Admin is at `http://localhost:8000/admin/`.

---

## Frontend Setup

### Prerequisites
- Node.js 20+

### Steps

```bash
cd frontend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit VITE_API_BASE_URL if needed

# Start dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## API Endpoints

| Method | Endpoint                    | Description               |
|--------|-----------------------------|---------------------------|
| GET    | `/api/v1/colleges/`         | List colleges             |
| GET    | `/api/v1/colleges/{slug}/`  | College detail            |
| GET    | `/api/v1/courses/`          | List courses              |
| GET    | `/api/v1/courses/{id}/`     | Course detail             |
| GET    | `/api/v1/reviews/`          | List approved reviews     |
| POST   | `/api/v1/reviews/`          | Submit a review (auth)    |
| POST   | `/api/v1/leads/`            | Submit an enquiry         |
| GET    | `/api/v1/users/`            | User profile (auth)       |

All list endpoints support `search`, `ordering`, and filter query params.

---

## Docker Setup

```bash
# Copy and fill in env file
cp backend/.env.example backend/.env

# Build and start all services
docker compose up --build

# Run migrations (first time)
docker compose exec backend python manage.py migrate
docker compose exec backend python manage.py createsuperuser
```

Services:
- Frontend: `http://localhost`
- Backend API: `http://localhost:8000`
- PostgreSQL: `localhost:5432`

---

## Environment Variables

### Backend (`backend/.env`)

| Variable               | Description                        | Default          |
|------------------------|------------------------------------|------------------|
| `SECRET_KEY`           | Django secret key                  | —                |
| `DEBUG`                | Enable debug mode                  | `True`           |
| `ALLOWED_HOSTS`        | Comma-separated allowed hosts      | `localhost`      |
| `DB_NAME`              | PostgreSQL database name           | `college_finder` |
| `DB_USER`              | PostgreSQL username                | `postgres`       |
| `DB_PASSWORD`          | PostgreSQL password                | —                |
| `DB_HOST`              | PostgreSQL host                    | `localhost`      |
| `DB_PORT`              | PostgreSQL port                    | `5432`           |
| `CORS_ALLOWED_ORIGINS` | Comma-separated frontend origins   | `http://localhost:5173` |

### Frontend (`frontend/.env`)

| Variable             | Description         | Default                        |
|----------------------|---------------------|--------------------------------|
| `VITE_API_BASE_URL`  | Backend API base URL | `http://localhost:8000/api/v1` |
