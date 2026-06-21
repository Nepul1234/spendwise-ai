# SpendWise AI

> A personal finance tracker that understands plain English. Type how you spent — AI handles the rest.

![Java](https://img.shields.io/badge/Java-21-orange?logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-4.1.0--M4-brightgreen?logo=springboot&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue?logo=postgresql&logoColor=white)
![Gemini](https://img.shields.io/badge/Gemini-2.0_Flash-4285F4?logo=google&logoColor=white)

---

---

<img width="958" height="654" alt="Image" src="https://github.com/user-attachments/assets/fc6fa5a0-031b-44c1-864a-d25030807448" />

---

## What it does

Instead of filling out forms, you describe a transaction in natural language — _"spent 500 on groceries yesterday at bhatbhateni"_ — and Gemini AI extracts the amount, category, date, and merchant automatically. SpendWise AI also generates weekly and monthly spending insight reports on a schedule, so you always know where your money is going.

---

## Screens

### Login & Register

Split-layout auth screens with a live AI parse preview on the left side panel.

---

### Dashboard

At-a-glance financial overview with four KPI cards (net worth, monthly income, monthly spend, available budget), a 30-day spending bar chart, category donut breakdown, account balance cards, recent transactions, and smart alerts.

---

### Transactions

Full transaction history grouped by date with inflow / outflow / net summary strip. Filter by type (Expense / Income / Transfer) or search by merchant and note.

---

### Add Transaction

Manual entry form with type selector, amount, merchant, account, category, payment mode (Card / Cash / Bank / Wallet / UPI), and a live preview of the transaction row before saving.

---

### AI Quick Add

Type anything — the app submits to Gemini, shows a parsing animation, then presents the extracted fields (type, amount, category, date) for confirmation before saving. Keeps a history of recent AI parses with example prompts to get started.

---

### Insights

Weekly and monthly AI-generated narrative summaries with highlighted numbers, a bullet point highlights grid, daily spend chart for the period, category breakdown, and a vs-last-period comparison table.

---

## Tech Stack

### Backend (`/server`)

| Layer | Technology |
|---|---|
| Runtime | Java 21 |
| Framework | Spring Boot 4.1.0-M4 |
| Database | PostgreSQL 16 + Spring Data JPA |
| AI | Spring AI 2.0.0-M4 · Google Gemini 2.0 Flash |
| Security | Spring Security · JWT · BCrypt |
| Real-time | Server-Sent Events (SSE) |
| Build | Maven |

### Frontend (`/client`)

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build tool | Vite |
| Styling | CSS (custom dark design system) |
| Charts | Custom SVG bar chart, sparkline, donut |
| Fonts | Inter Tight · JetBrains Mono |

---

## Project Structure

```
spendwise-ai/
├── server/          Spring Boot REST API
└── client/          React + TypeScript frontend
```

---

## Getting Started

### Backend

See [`server/README.md`](server/README.md) for full setup instructions.

```bash
cd server
cp src/main/resources/application.yml.example src/main/resources/application.yml
# Fill in DB_USERNAME, DB_PASSWORD, GEMINI_API_KEY, JWT_SECRET_KEY
./mvnw spring-boot:run
```

API runs at `http://localhost:8080`.

### Frontend

```bash
cd client
npm install
npm run dev
```

App runs at `http://localhost:5173`.

---

## API Highlights

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register |
| `POST` | `/api/auth/login` | Login → JWT |
| `GET/POST/DELETE` | `/api/transactions` | Transaction CRUD |
| `POST` | `/api/ai-input` | NL input → async parse (SSE) |
| `POST` | `/api/ai-input/sync` | NL input → instant parse |
| `GET` | `/api/notifications/stream` | SSE stream |
| `GET` | `/api/insights` | AI spending insights |

---

## License

MIT
