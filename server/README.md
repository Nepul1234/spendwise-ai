# SpendWise AI — Backend

![Java](https://img.shields.io/badge/Java-21-orange?logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-4.1.0--M4-brightgreen?logo=springboot&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue?logo=postgresql&logoColor=white)
![Spring AI](https://img.shields.io/badge/Spring_AI-2.0.0--M4-6DB33F?logo=spring&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow)

REST API backend for SpendWise AI — a personal finance tracker where you log expenses in plain English. Type _"spent $45 on groceries yesterday"_ and Gemini AI handles the parsing, categorization, and saving.

---

## Features

- **Natural language input** — describe transactions in plain text; Google Gemini 2.0 Flash extracts amount, category, date, and type
- **Async + real-time** — AI tasks are queued and processed asynchronously; clients get status updates via Server-Sent Events (SSE)
- **Sync parse** — instant parsing endpoint for cases where SSE isn't needed
- **Full transaction CRUD** — supports EXPENSE, INCOME, and TRANSFER types
- **Account balance tracking** — ASSET and LIABILITY payment modes; transfers update both accounts
- **AI spending insights** — weekly and monthly narrative summaries generated automatically on a cron schedule
- **JWT authentication** — stateless Bearer token auth with BCrypt password hashing

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Java 21 |
| Framework | Spring Boot 4.1.0-M4 |
| Database | PostgreSQL 16 + Spring Data JPA / Hibernate |
| AI | Spring AI 2.0.0-M4 · Google Gemini 2.0 Flash |
| Security | Spring Security · JJWT 0.13.0 |
| Mapping | MapStruct 1.7.0 · Lombok |
| Real-time | Server-Sent Events (`SseEmitter`) |
| Build | Maven (via `./mvnw` wrapper) |

---

## Getting Started

### Prerequisites

- Java 21 ([Adoptium](https://adoptium.net/))
- PostgreSQL 16 ([postgresql.org](https://www.postgresql.org/download/))
- A [Google AI Studio](https://aistudio.google.com/) API key (free)

### 1. Clone

```bash
git clone https://github.com/Nepul1234/spendwise-ai.git
cd spendwise-ai/server
```

### 2. Database Setup

Connect to PostgreSQL as a superuser and run:

```sql
CREATE DATABASE ai_expense_tracker;
CREATE USER ai_expense_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE ai_expense_tracker TO ai_expense_user;
ALTER DATABASE ai_expense_tracker OWNER TO ai_expense_user;

\c ai_expense_tracker
GRANT ALL ON SCHEMA public TO ai_expense_user;
```

### 3. Configure

Copy the example config and fill in your values:

```bash
cp src/main/resources/application.yml.example src/main/resources/application.yml
```

Set the required environment variables (or edit `application.yml` directly):

| Variable | Description |
|---|---|
| `DB_USERNAME` | PostgreSQL username |
| `DB_PASSWORD` | PostgreSQL password |
| `GEMINI_API_KEY` | Google AI Studio API key |
| `JWT_SECRET_KEY` | Base64-encoded secret (min 32 bytes) |

Generate a JWT secret:
```bash
openssl rand -base64 32
```

### 4. Run

```bash
./mvnw spring-boot:run
```

Server starts on `http://localhost:8080`. Hibernate creates the schema and seed data loads automatically on first run.

**IntelliJ IDEA:** Open the `server/` directory, ensure Java 21 SDK is set (File → Project Structure → SDK), then run `AiExpenseTrackerApplication`.

---

## API Reference

All protected endpoints require:
```
Authorization: Bearer <access_token>
```

### Auth

| Method | Endpoint | Auth |
|---|---|---|
| `POST` | `/api/auth/register` | No |
| `POST` | `/api/auth/login` | No |

```json
// Request body (both endpoints)
{ "username": "john_doe", "password": "secret123" }

// Login response
{ "accessToken": "eyJhbGci..." }
```

### Transactions

| Method | Endpoint | Auth |
|---|---|---|
| `POST` | `/api/transactions` | Yes |
| `GET` | `/api/transactions` | Yes |
| `DELETE` | `/api/transactions/{id}` | Yes |

```json
// EXPENSE / INCOME
{
  "amount": 45.00,
  "type": "EXPENSE",
  "categoryId": 1,
  "accountId": 1,
  "paymentModeId": 1,
  "date": "20-05-2025",
  "note": "Groceries"
}

// TRANSFER
{
  "amount": 200.00,
  "type": "TRANSFER",
  "accountId": 1,
  "transferId": 2,
  "date": "20-05-2025"
}
```

### AI Input

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/api/ai-input` | Async — queues a parse task | Yes |
| `GET` | `/api/notifications/stream` | SSE stream for task updates | Yes |
| `POST` | `/api/ai-input/sync` | Sync — returns parsed result instantly | No |

```json
// Request
{ "rawText": "spent $45 on groceries yesterday" }

// Async response
{ "id": 7, "status": "PENDING", "rawText": "spent $45 on groceries yesterday" }

// Sync response
{ "amount": 45.00, "type": "EXPENSE", "categoryId": 3, "date": "19-05-2025" }
```

### Insights

| Method | Endpoint | Auth |
|---|---|---|
| `GET` | `/api/insights?type=WEEKLY\|MONTHLY` | Yes |
| `GET` | `/api/insights/latest?type=WEEKLY\|MONTHLY` | Yes |

> Insights are generated automatically — weekly every Monday at 9 AM, monthly on the 1st of each month at 9 AM.

---

## Async AI Flow

```
Client                      Server                       Gemini
  │  POST /api/ai-input       │                              │
  │ ────────────────────────► │  Save task (PENDING)         │
  │  { id: 7, PENDING }       │                              │
  │ ◄──────────────────────── │                              │
  │                           │                              │
  │  GET /notifications/stream│                              │
  │ ────────────────────────► │  SSE open                    │
  │                           │                              │
  │                           │  Scheduler (every 5s)        │
  │                           │ ────────────────────────────►│
  │                           │  { amount, category, date }  │
  │                           │ ◄────────────────────────────│
  │                           │  Save Transaction            │
  │                           │  Task → COMPLETED            │
  │  SSE: { id:7, COMPLETED } │                              │
  │ ◄──────────────────────── │                              │
```

For an immediate response without SSE, use `POST /api/ai-input/sync`.

---

## Postman Collection

Import `ai-expense-tracker-api.postman_collection.json` from the server root. It includes pre-configured variables (`{{base_url}}`, `{{token}}`) and auto-save scripts that write the JWT on login/register.

---

## Project Structure

```
src/main/java/com/example/ai_expense_tracker/
├── controller/          REST layer (Auth, Transactions, AI, Insights, SSE)
├── service/
│   ├── ai/              Gemini integration + parse task orchestration
│   ├── insight/         Scheduled insight generation
│   ├── transaction/     CRUD + strategy dispatch
│   │   └── strategy/    ExpenseIncomeStrategy, TransferStrategy
│   ├── account/         Balance management
│   │   └── strategy/    AssetAccountBalanceStrategy
│   ├── auth/            JWT issuance + BCrypt auth
│   └── notification/    SSE emitter registry
├── security/            JwtAuthFilter, BearerAuthProvider
├── schedule/            AiTaskScheduler (5s), AiInsightScheduler (cron)
├── event/               AiParsingTaskCreated/Completed events
├── model/               JPA entities
├── repo/                Spring Data repositories
├── dto/                 Immutable Java records
├── mapper/              MapStruct mappers
├── config/              Security, AI, JWT beans
└── exception/           Domain exceptions + GlobalExceptionHandler
```

---

## License

[MIT](LICENSE)
