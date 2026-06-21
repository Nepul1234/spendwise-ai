# AI Expense Tracker

![Java](https://img.shields.io/badge/Java-21-orange?logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-4.1.0--M4-brightgreen?logo=springboot&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue?logo=postgresql&logoColor=white)
![Spring AI](https://img.shields.io/badge/Spring_AI-2.0.0--M4-6DB33F?logo=spring&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow)

A personal finance REST API backend that lets you record expenses using **plain English**. Describe a transaction naturally — _"spent $45 on groceries yesterday"_ — and Google Gemini AI parses it into a structured record automatically.

---

## Overview

AI Expense Tracker removes the friction of manual data entry. Instead of filling out forms, users describe their spending in natural language. The backend submits the text to **Google Gemini 2.0 Flash**, extracts the amount, category, date, and type, then persists the transaction — all without any UI input fields.

Beyond data entry, the API generates **weekly and monthly AI spending insights** automatically on a schedule, giving users a narrative summary of their financial patterns without lifting a finger.

---

## Features

| Feature | Details |
|---|---|
| **JWT Authentication** | Register and login with BCrypt-hashed passwords; stateless Bearer token auth |
| **Transaction Management** | Full CRUD for EXPENSE, INCOME, and TRANSFER transaction types |
| **Natural Language AI Input** | Send raw text; Gemini parses amount, date, category, and type |
| **Async AI Processing + SSE** | Tasks are queued and processed asynchronously; clients receive real-time status updates via Server-Sent Events |
| **Sync AI Parse** | Synchronous endpoint for instant parsing without SSE polling |
| **AI Spending Insights** | Weekly and monthly insight reports generated automatically by a scheduler |
| **Account & Balance Management** | Track account balances; transfers update both source and destination accounts |
| **Payment Mode Support** | ASSET (debit) and LIABILITY (credit) payment modes with bank and card associations |

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Runtime** | Java 21 |
| **Framework** | Spring Boot 4.1.0-M4 (Spring Framework 7) |
| **Database** | PostgreSQL 16 |
| **AI** | Spring AI 2.0.0-M4 · Google Gemini 2.0 Flash (via OpenAI-compatible API) |
| **Security** | Spring Security · JJWT 0.13.0 |
| **ORM** | Hibernate 7 · Spring Data JPA |
| **Mapping** | MapStruct 1.7.0 · Lombok 1.18 |
| **Async Notifications** | Server-Sent Events (SSE) via `SseEmitter` |
| **Build** | Apache Maven |

---

## Getting Started

### Prerequisites

- **Java 21** — [Download](https://adoptium.net/)
- **PostgreSQL 16** — [Download](https://www.postgresql.org/download/)
- **Maven 3.9+** — bundled via `./mvnw` wrapper

### 1. Database Setup

Connect to PostgreSQL as a superuser and run:

```sql
CREATE DATABASE ai_expense_tracker;
CREATE USER ai_expense_user WITH PASSWORD '1234';
GRANT ALL PRIVILEGES ON DATABASE ai_expense_tracker TO ai_expense_user;
ALTER DATABASE ai_expense_tracker OWNER TO ai_expense_user;

\c ai_expense_tracker
GRANT ALL ON SCHEMA public TO ai_expense_user;
```

### 2. Clone & Configure

```bash
git clone https://github.com/your-username/ai-expense-tracker.git
cd ai-expense-tracker
```

The default configuration in `src/main/resources/application.yml` connects to the database above. If you use different credentials, update the `spring.datasource` section accordingly.

The Google Gemini API key is pre-configured for development. To use your own key, set the environment variable:

```bash
export GEMINI_API_KEY=your_api_key_here
```

Get a free API key at [Google AI Studio](https://aistudio.google.com/).

### 3. Run

```bash
./mvnw spring-boot:run
```

The server starts on `http://localhost:8080`. On first run, Hibernate creates the schema and seed data is loaded automatically.

### Run with IntelliJ IDEA

1. Open the project root directory in IntelliJ IDEA
2. Ensure **Java 21 SDK** is configured (File → Project Structure → SDK)
3. Open the Maven panel and click **Reload All Maven Projects**
4. Run `AiExpenseTrackerApplication` via the green play button or the Spring Boot run configuration

---

## API Endpoints

All protected endpoints require the header:
```
Authorization: Bearer <access_token>
```

### Authentication

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/api/auth/register` | Create a new user account | No |
| `POST` | `/api/auth/login` | Login and receive a JWT | No |

**Register body:**
```json
{
  "username": "john_doe",
  "password": "secret123"
}
```

**Login response:**
```json
{
  "accessToken": "eyJhbGci..."
}
```

---

### Transactions

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/api/transactions` | Create a transaction (EXPENSE / INCOME / TRANSFER) | Yes |
| `GET` | `/api/transactions` | Get all transactions for the authenticated user | Yes |
| `DELETE` | `/api/transactions/{id}` | Delete a transaction by ID | Yes |

**Create transaction body (EXPENSE / INCOME):**
```json
{
  "amount": 45.00,
  "type": "EXPENSE",
  "categoryId": 1,
  "accountId": 1,
  "paymentModeId": 1,
  "date": "20-05-2025",
  "note": "Groceries"
}
```

**Create transaction body (TRANSFER):**
```json
{
  "amount": 200.00,
  "type": "TRANSFER",
  "accountId": 1,
  "transferId": 2,
  "date": "20-05-2025"
}
```

---

### AI Input

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/api/ai-input` | Submit raw text — creates an async task | Yes |
| `GET` | `/api/notifications/stream` | Subscribe to SSE for task status updates | Yes |
| `POST` | `/api/ai-input/sync` | Submit raw text — returns parsed result immediately | No |

**Request body:**
```json
{
  "rawText": "spent $45 on groceries yesterday"
}
```

**Async response (`POST /api/ai-input`):**
```json
{
  "id": 7,
  "status": "PENDING",
  "rawText": "spent $45 on groceries yesterday"
}
```

**Sync response (`POST /api/ai-input/sync`):**
```json
{
  "amount": 45.00,
  "type": "EXPENSE",
  "categoryId": 3,
  "date": "19-05-2025"
}
```

---

### AI Spending Insights

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/api/insights?type=WEEKLY` | Get all weekly insights for the user | Yes |
| `GET` | `/api/insights?type=MONTHLY` | Get all monthly insights for the user | Yes |
| `GET` | `/api/insights/latest?type=WEEKLY` | Get the most recent weekly insight | Yes |
| `GET` | `/api/insights/latest?type=MONTHLY` | Get the most recent monthly insight | Yes |

**Response:**
```json
{
  "id": 3,
  "type": "WEEKLY",
  "insightText": "This week you spent $312 across 9 transactions. Your top category was Food & Dining at 42%...",
  "status": "COMPLETED",
  "createdAt": 1747699200000
}
```

> Insights are generated automatically — weekly every Monday at 9 AM, monthly on the 1st of each month at 9 AM.

---

## How AI Input Works

```
Client                     Server                        Gemini API
  │                           │                               │
  │  POST /api/ai-input        │                               │
  │  { rawText: "..." }        │                               │
  │ ─────────────────────────► │                               │
  │                           │  Save task (PENDING)          │
  │  { id: 7, status: PENDING }│                               │
  │ ◄───────────────────────── │                               │
  │                           │                               │
  │  GET /notifications/stream │                               │
  │ ─────────────────────────► │  (SSE connection open)        │
  │                           │                               │
  │                           │  Scheduler picks up task      │
  │                           │ ─────────────────────────────► │
  │                           │  Parsed: amount, category,    │
  │                           │  date, type                   │
  │                           │ ◄───────────────────────────── │
  │                           │                               │
  │                           │  Save Transaction             │
  │                           │  Update task → COMPLETED      │
  │                           │                               │
  │  SSE: { id:7, COMPLETED } │                               │
  │ ◄───────────────────────── │                               │
```

The async scheduler polls for `PENDING` tasks every **5 seconds**. For use cases requiring an immediate response, use the `/sync` endpoint instead.

---

## Postman Collection

Import `ai-expense-tracker-api.postman_collection.json` from the project root to test all endpoints. The collection includes:

- Pre-configured collection variables (`{{base_url}}`, `{{token}}`)
- Auto-save scripts on Login and Register that write the JWT to `{{token}}`
- Organized folders: **Auth**, **Transactions**, **AI Input**, **Insights**

---

## Project Structure

```
src/main/java/com/example/ai_expense_tracker/
│
├── controller/              # REST controllers (Auth, Transactions, AI, Insights, SSE)
├── service/
│   ├── ai/                  # AI parsing logic and parse task management
│   ├── insight/             # Weekly/monthly insight generation
│   ├── transaction/         # Transaction CRUD + strategy pattern
│   │   └── strategy/        # ExpenseIncomeStrategy, TransferStrategy
│   ├── account/             # Account balance management
│   │   └── strategy/        # AssetAccountBalanceStrategy
│   ├── auth/                # Username/password authentication
│   ├── notification/        # SSE emitter management
│   ├── category/            # Category lookup
│   ├── paymentmode/         # Payment mode management
│   └── appuser/             # User profile service
│
├── security/                # JWT filter, auth provider, entry point
├── schedule/                # AiTaskScheduler (5s poll), AiInsightScheduler (cron)
├── event/                   # Spring application events for async task flow
├── model/                   # JPA entities (Transaction, Account, AppUser, ...)
├── repo/                    # Spring Data JPA repositories
├── dto/                     # Request/response records
├── mapper/                  # MapStruct mappers
├── config/                  # Spring Security, AI, JWT config beans
├── exception/               # Domain exceptions + GlobalExceptionHandler
└── util/                    # JwtUtils
```

---

## License

This project is licensed under the [MIT License](LICENSE).
