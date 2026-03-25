# G-Scores

Dear **HR team** and **Developer team** at **Golden Owl**,
I truly appreciate the opportunity to apply and showcase my technical skills through this project.
Thank you for taking the time to interview me and review my source code!

---

## Key Features
A full-stack web application designed for students to look up student exam results, analyze score distributions by subject and academic block, and view key performance metrics through an interactive dashboard. 
- **Search Scores:** Enter a student’s registration number (SBD) to view individual scores.
- **Interactive Dashboard:** View KPI cards (total candidates, average scores), score distribution summaries, and Top 10 student leaderboards by group/block.
- **Detailed Reports:** Filter by subject or academic group, and analyze subject performance organized dynamically by score ranges:
  - $\ge 8$ points
  - $8 > \text{points} \ge 6$
  - $6 > \text{points} \ge 4$
  - $< 4$ points
- **High Performance Backend:** Java Spring Boot backend handling dynamic native queries and database seeding.
- This is [recorded videos](https://drive.google.com/file/d/1EhoMXrm3jgPslHF5Oop8aZGSoXgBhOO_/view?usp=sharing) for G-Scores 
---

## Tech Stack

- **Language:** TypeScript (Frontend), Java 21 (Backend)
- **Frontend App Framework:** Next.js 15 (App Router)
- **Frontend UI:** TailwindCSS, ShadCN/UI, Lucide React, ApexCharts
- **Backend Framework:** Spring Boot (Spring Web, Spring Data JPA)
- **Database:** PostgreSQL 15
- **Deployment:** Docker, Render, Neon (DB)

---

## Prerequisites

Before getting started, ensure you have the following installed:

- **Node.js:** v18 or higher (for the Next.js frontend)
- **Java Development Kit (JDK):** v21 (for the Spring Boot backend)
- **Docker & Docker Compose:** For running the database locally
- **PostgreSQL Client (PgAdmin / psql):** (Optional) for manual database inspection
- **Git**

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/abcdefghuy/G-Scores-Technical-Test
cd G-Scores-Technical-Test
```

*(Note: Ensure you navigate to the actual project root directory where `G-Scores-backend` and `G-Scores-frontend` exist)*

### 2. Backend Setup (Spring Boot)

Navigate to the backend directory:

```bash
cd G-Scores-backend
```

**Environment Variables:**
Create a `.env` file in the root of the backend folder. You can copy the values below:

```env
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/gscores
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=postgres
APP_PROFILE=dev
APP_CORS_ALLOWED_ORIGINS=http://localhost:3000
```

**Run the Database via Docker:**
If you don't have a local Postgres running, you can start the provided `docker-compose` container:

```bash
docker-compose up db -d
```

**Run the Spring Boot Application:**
You can start the backend using the Maven wrapper:

```bash
# On Linux / macOS
./mvnw spring-boot:run

# On Windows
mvnw.cmd spring-boot:run
```

The backend server will start at `http://localhost:8080`.
The application automatically seeds the local database using the configured batch size using `DataSeeder.java` if data is missing, pointing to `classpath:data/diem_thi_thpt_2024.csv`.

### 3. Frontend Setup (Next.js)

Open a new terminal session and navigate to the frontend directory:

```bash
cd G-Scores-frontend
```

**Environment Variables:**
Create a `.env.local` to point to the local backend:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

**Install Dependencies and Run:**

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Architecture

### Directory Structure

```text
├── G-Scores-backend/                 # Java Spring Boot API
│   ├── src/main/java/.../GScores/
│   │   ├── config/                   # CORS Config, OpenAPI Swagger Config
│   │   ├── controller/               # REST Endpoints (Score, Report, Statistics)
│   │   ├── dto/                      # Data Transfer Objects (Req/Res models)
│   │   ├── entity/                   # JPA Entities (StudentScore)
│   │   ├── exception/                # Global Exception Handler
│   │   ├── mapper/                   # Object mapping
│   │   ├── model/                    # Enums (Subject, SubjectGroup, ScoreLevel)
│   │   ├── repository/               # Postgre Repos / Native Queries 
│   │   ├── seeder/                   # CSV Parsing and Data Seeder implementations
│   │   └── service/                  # Business Logic Layer
│   ├── src/main/resources/           # App Properties, Static Data (CSV), Templates
│   ├── docker-compose.yml            # DB and Local Environment orchestrator
│   └── pom.xml                       # Maven Dependency tracking
│
├── G-Scores-frontend/                # Next.js Application
│   ├── app/                          # Next.js App Router (Pages & Layouts)
│   │   ├── rankings/                 # Top 10 leaderboards
│   │   ├── report/                   # Detailed 4-level distributions
│   │   ├── scores/                   # SBD lookup functionality
│   │   └── statistics/               # Aggregated KPI and overview
│   ├── components/                   # Reusable ShadCN / custom UI components
│   ├── lib/                          # Utility functions
│   ├── public/                       # Static web assets
│   ├── package.json                  # Next.js Dependencies
│   └── tailwind.config.ts            # Tailwind UI configuration
└── README.md
```

### Request Lifecycle

1. **User Action:** A user submits a registration number (SBD) via the Next.js UI frontend.
2. **Next.js Validation:** The input is validated on the client side using React standard libraries.
3. **API Call:** An HTTP request is dispatched using Fetch API to the Spring Web `ScoreController`.
4. **Business Logic:** Spring `ScoreService` retrieves the `StudentScore` entity through `StudentScoreRepository`.
5. **Database Query:** The Database layer executes a native query or JPA expression against PostgreSQL.
6. **Response Delivery:** Data is mapped to a standard `ScoreResponse` DTO and returned to the client frontend as JSON.

### Key Backend Components

- **Seeder mechanism (`DataSeeder.java`):** Custom-built seeder to read `csv` dataset and insert large quantities of rows via Hibernate JDBC batches.
- **Reporting Engine (`NativeQueryRepository.java`):** Utilizes native Postgres queries for efficient multidimensional data grouping (analyzing by 4 score tiers or specific subject blocks like A, B, C, D).
- **Controllers & DTO Validation:** Strong boundary validation leveraging `spring-boot-starter-validation`.

---

## Environment Variables Reference

### Backend (`G-Scores-backend/.env`)

| Variable | Description | Example |
| :--- | :--- | :--- |
| `SPRING_DATASOURCE_URL` | PostgreSQL JDBC connection string | `jdbc:postgresql://localhost:5432/gscores` |
| `SPRING_DATASOURCE_USERNAME`| PostgreSQL user | `postgres` |
| `SPRING_DATASOURCE_PASSWORD`| PostgreSQL password | `postgres` |
| `APP_PROFILE` | Spring Active Profile | `dev` or `prod` |
| `APP_CORS_ALLOWED_ORIGINS`  | Web endpoints allowed to fetch API | `http://localhost:3000` |

### Frontend (`G-Scores-frontend/.env.local`)

| Variable | Description | Example |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_API_URL` | The public URL of the backend API | `http://localhost:8080` |

---

## Available Scripts

### Backend (Maven Wrapper)

| Command | Description |
| :--- | :--- |
| `./mvnw spring-boot:run` | Start development server |
| `./mvnw clean install` | Clean output and compile target |
| `./mvnw test` | Run the standard test suite |
| `docker-compose up db -d`| Launch local PostgreSQL database |

### Frontend (npm)

| Command | Description |
| :--- | :--- |
| `npm run dev` | Start Next.js development server |
| `npm run build` | Build the application for production |
| `npm run start` | Start the production server from build |
| `npm run lint` | Run ESLint across Next.js codebase |

---

## Deployment

### Backend via Docker

The backend comes pre-configured with a Production-ready `Dockerfile` and `docker-compose.yml`. 

1. **Build backend image:**
   ```bash
   cd G-Scores-backend
   docker build -t g-scores-backend .
   ```
2. **Run stack together:**
   The included `docker-compose.yml` mounts both the app container and database container locally.
   ```bash
   docker-compose up -d
   ```

### Frontend Deployment (Vercel/Render)

The Next.js frontend is natively compatible with platforms like Vercel.

1. Create a new Web Service or Vercel Project and connect to the `.G-Scores-frontend/` directory.
2. Ensure the framework preset is **Next.js**.
3. Expose environment variable `NEXT_PUBLIC_API_URL` pointing to your deployed Backend URL (e.g. `https://my-backend-domain.com`).

**Database Hosting:** You can host PostgreSQL instances optimally via platforms like [Neon.tech](https://neon.tech/) to allow external database connections.

**Frontend:** Deployed and accessible at: [https://g-scores-frontend-pi.vercel.app/](https://g-scores-frontend-pi.vercel.app/)

**Note:**
- The backend is deployed on Render's free tier, so it may go to sleep after a period of inactivity.  
- When accessing the API for the first time after being idle, it might take a few seconds to respond.

---

## Troubleshooting

### Port Conflicts
**Error:** `Web server failed to start. Port 8080 was already in use.`  
**Solution:** Either kill the process running on `8080` or update your `application.properties` to specify `server.port=8081`. Remember to update the Frontend's `.env.local` to match.

### Database Seeding Refusal
**Error:** NullPointerException or missing data on dashboards immediately after startup.  
**Solution:** Ensure the `data/diem_thi_thpt_2024.csv` dataset is present in your classpath resource directory. Verify via your PG client that `student_score` table has items.

### Frontend API CORS Policy
**Error:** `Blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present`.  
**Solution:** Ensure your backend's `.env` specifically allows your domain origin inside `APP_CORS_ALLOWED_ORIGINS` (comma-separated with no trailing slashes).

---

## Author

**Developed by:** Nguyễn Sang Huy  
**For:** Golden Owl Asia - Web Development Internship Assignment  
**Contact information:** nguyensanghuypy@gmail.com  
