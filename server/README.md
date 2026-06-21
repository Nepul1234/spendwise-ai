# SpendWise AI — Backend

A personal finance REST API where you log expenses in plain English. Powered by Google Gemini, Spring Boot, and PostgreSQL.

## Tech Stack

- Java 21 · Spring Boot 4.1.0-M4
- PostgreSQL 16 · Spring Data JPA
- Spring AI 2.0.0-M4 · Google Gemini 2.0 Flash
- Spring Security · JWT · BCrypt
- Server-Sent Events (SSE)

## Setup

**1. Database**

```sql
CREATE DATABASE ai_expense_tracker;
CREATE USER ai_expense_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE ai_expense_tracker TO ai_expense_user;
ALTER DATABASE ai_expense_tracker OWNER TO ai_expense_user;
\c ai_expense_tracker
GRANT ALL ON SCHEMA public TO ai_expense_user;
```

**2. Config**

```bash
cp src/main/resources/application.yml.example src/main/resources/application.yml
```

Fill in the required values:

| Variable | Description |
|---|---|
| `DB_USERNAME` | PostgreSQL username |
| `DB_PASSWORD` | PostgreSQL password |
| `GEMINI_API_KEY` | [Google AI Studio](https://aistudio.google.com/) key |
| `JWT_SECRET_KEY` | Base64 secret — generate with `openssl rand -base64 32` |

**3. Run**

```bash
./mvnw spring-boot:run
```

Server starts at `http://localhost:8080`.

## API

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register | No |
| `POST` | `/api/auth/login` | Login → JWT | No |
| `GET` | `/api/transactions` | List transactions | Yes |
| `POST` | `/api/transactions` | Create transaction | Yes |
| `DELETE` | `/api/transactions/{id}` | Delete transaction | Yes |
| `POST` | `/api/ai-input` | NL input → async parse task | Yes |
| `GET` | `/api/notifications/stream` | SSE stream for task updates | Yes |
| `POST` | `/api/ai-input/sync` | NL input → instant parse | No |
| `GET` | `/api/insights` | AI spending insights | Yes |

## Postman

Import `ai-expense-tracker-api.postman_collection.json` — JWT is saved automatically on login/register.

## License

MIT
