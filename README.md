<div align="center">

# Horizon

### A Modern Banking Platform for Connected Accounts and Real-Time Transfers

Connect any bank. See everything. Send money to anyone on the platform.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Plaid](https://img.shields.io/badge/Plaid-API-0A0E27?logo=plaid&logoColor=white)](https://plaid.com/)
[![Dwolla](https://img.shields.io/badge/Dwolla-ACH-FF6F00)](https://www.dwolla.com/)
[![Appwrite](https://img.shields.io/badge/Appwrite-Auth%20%2B%20DB-FD366E?logo=appwrite&logoColor=white)](https://appwrite.io/)
[![Sentry](https://img.shields.io/badge/Sentry-Observability-362D59?logo=sentry&logoColor=white)](https://sentry.io/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](#license)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Core Flows](#core-flows)
- [Screenshots](#screenshots)
- [Roadmap](#roadmap)
- [Limitations](#limitations)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

## Overview

**Horizon** is a full-stack banking dashboard that turns several real banking APIs into a single end-user experience. After signing up, the user is registered both inside **Appwrite** (identity / database) and inside **Dwolla** (a customer record needed to move money). Users link banks through **Plaid Link**; the application then exchanges the public token for an access token, fetches balances and transactions, and stores a sharable encrypted account ID that can be used to receive transfers. A transfer page lets users send money from one of their linked banks to another user's sharable ID, persisting a corresponding transaction record in Appwrite.

Built with the **Next.js 14 App Router**, server actions, and end-to-end TypeScript, Horizon shows how three specialized SaaS APIs (Plaid + Dwolla + Appwrite) plus a server-first React framework can deliver a production-shaped banking experience without operating proprietary card rails or a core ledger.

---

## Features

- **Secure authentication** — Appwrite email/password sessions stored in `httpOnly`, `secure`, `sameSite=strict` cookies.
- **Connect multiple banks** — Plaid Link integration with public-token-for-access-token exchange.
- **Aggregated dashboard** — total balance, per-account doughnut chart, animated counter, and recent transactions across all linked banks.
- **Smart categorization** — Plaid's personal-finance categories mapped to 10 user-friendly buckets (Food & Drink, Travel, Shops, Healthcare, …).
- **Per-bank transaction history** — paginated, cursor-based incremental sync via `transactionsSync`.
- **Peer-to-peer ACH transfers** — Dwolla-powered transfers between two users' funding sources.
- **Encrypted sharable IDs** — account IDs are never exposed in plain form when sharing receive credentials.
- **Light & dark themes** — bootstrapped pre-hydration to avoid the typical theme-flash on first paint.
- **Responsive UI** — desktop sidebar collapses to a `MobileNav` sheet on small screens.
- **Production observability** — Sentry instrumentation across browser, Node server, and edge runtimes.

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5 |
| UI | React 18, TailwindCSS 3, shadcn/ui, Radix UI, lucide-react |
| Forms / Validation | react-hook-form, @hookform/resolvers, Zod |
| Charts | Chart.js 4, react-chartjs-2, react-countup |
| Auth & Database | Appwrite (`node-appwrite` v24) |
| Bank Aggregation | Plaid (`plaid` v42, `react-plaid-link` v4) |
| Payments | Dwolla (`dwolla-v2` v3) |
| Observability | Sentry (`@sentry/nextjs` v10) |
| Tooling | ESLint, PostCSS, Autoprefixer |

---

## Architecture

```text
+------------------+      +--------------------------+      +-------------+
|  Browser (User)  |<---->|  Next.js App Router      |<---->|  Appwrite   |
|  React+Tailwind  | HTTPS|  Server Components &     |      |  Auth + DB  |
+------------------+      |  Server Actions          |      +-------------+
                          +-----------+--------------+
                                      |
                  +-------------------+-------------------+
                  v                   v                   v
            +---------+         +---------+         +----------+
            |  Plaid  |         | Dwolla  |         |  Sentry  |
            |  (read) |         | (write) |         |  (obs.)  |
            +---------+         +---------+         +----------+
```

**Three clean responsibilities**

- **Plaid →** read balances and transactions.
- **Dwolla →** move money via ACH.
- **Appwrite →** identity, sessions, and persistence.

---

## Project Structure

```text
my-app/
├── app/
│   ├── (auth)/                 # Sign-in & sign-up route group
│   │   ├── sign-in/page.tsx
│   │   └── sign-up/page.tsx
│   ├── (root)/                 # Authenticated dashboard
│   │   ├── page.tsx            # Home
│   │   ├── my-banks/page.tsx
│   │   ├── payment-transfer/page.tsx
│   │   └── transaction-history/page.tsx
│   ├── api/                    # Sample Sentry-instrumented API route
│   ├── global-error.tsx        # Top-level error boundary → Sentry
│   ├── layout.tsx              # Root layout, theme bootstrap
│   └── globals.css
├── components/                 # Domain components
│   ├── PlaidLink.tsx
│   ├── PaymentTransferForm.tsx
│   ├── BankDropdown.tsx
│   ├── TransactionsTable.tsx
│   ├── ThemeToggle.tsx
│   └── ui/                     # shadcn-style primitives
├── lib/
│   ├── appwrite.ts             # createSessionClient / createAdminClient
│   ├── plaid.ts                # Plaid API client
│   ├── utils.ts                # encryptId / decryptId / parseStringify
│   └── actions/
│       ├── user.actions.ts     # Auth, link-token, public-token exchange
│       ├── bank.actions.ts     # Account aggregation, transactionsSync
│       ├── dwolla.actions.ts   # Customer, funding source, transfer
│       └── transactions.actions.ts
├── constants/index.ts          # Sidebar links, category styles
├── instrumentation*.ts         # Sentry init (server / edge)
├── instrumentation-client.ts   # Sentry init (browser)
├── sentry.server.config.ts
├── sentry.edge.config.ts
├── tailwind.config.ts
├── next.config.mjs
└── package.json
```

---

## Getting Started

### Prerequisites

- **Node.js** 18.17 or later
- **npm**, **pnpm**, **yarn**, or **bun**
- A free **[Plaid](https://plaid.com/)** developer account (sandbox keys are enough)
- A free **[Dwolla](https://www.dwolla.com/)** sandbox account
- An **[Appwrite](https://appwrite.io/)** project (cloud or self-hosted) with collections for `users`, `banks`, and `transactions`
- *(Optional)* A **[Sentry](https://sentry.io/)** project for error tracking

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/horizon.git
cd horizon/my-app
```

### 2. Install dependencies

```bash
npm install
# or
pnpm install
# or
yarn install
```

### 3. Configure environment variables

Create a `.env.local` file inside `my-app/` (see [Environment Variables](#environment-variables) below).

### 4. Run the dev server

```bash
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## Environment Variables

Create `my-app/.env.local` with the following keys:

```env
# Next.js
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Appwrite
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT=your_project_id
NEXT_APPWRITE_KEY=your_server_api_key
APPWRITE_DATABASE_ID=your_database_id
APPWRITE_USER_COLLECTION_ID=your_user_collection_id
APPWRITE_BANK_COLLECTION_ID=your_bank_collection_id
APPWRITE_TRANSACTION_COLLECTION_ID=your_transaction_collection_id

# Plaid
PLAID_CLIENT_ID=your_plaid_client_id
PLAID_SECRET=your_plaid_sandbox_secret
PLAID_ENV=sandbox
PLAID_PRODUCTS=auth,transactions
PLAID_COUNTRY_CODES=US

# Dwolla
DWOLLA_KEY=your_dwolla_key
DWOLLA_SECRET=your_dwolla_secret
DWOLLA_BASE_URL=https://api-sandbox.dwolla.com
DWOLLA_ENV=sandbox

# Sentry (optional)
SENTRY_AUTH_TOKEN=your_sentry_auth_token
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
```

> **Never commit `.env.local`** — it is already covered by `.gitignore`.

---

## Available Scripts

Run inside `my-app/`:

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Next.js dev server on port 3000 |
| `npm run build` | Create a production build |
| `npm run start` | Run the production build |
| `npm run lint` | Run ESLint across the project |

---

## Core Flows

### 1. Bank Linking

```text
[User clicks "Connect Bank"]
            │
            ▼
[createLinkToken(user)]  ──► Plaid /link/token/create
            │
            ▼
   Plaid Link UI opens
            │
            ▼
[onSuccess(public_token)]
            │
            ▼
[exchangePublicToken]    ──► Plaid /item/public_token/exchange
                         ──► Plaid /accounts/get
            │
            ▼
   user has dwollaCustomerId?
       │              │
       │ yes          │ no
       ▼              ▼
[processorTokenCreate] [skip with warning,
 + addFundingSource]    transfers disabled]
       │              │
       └──────┬───────┘
              ▼
[createBankAccount in Appwrite
 (bankId, accessToken, fundingSourceUrl,
  sharableId = encryptId(account_id))]
              │
              ▼
        revalidatePath("/")
```

### 2. Payment Transfer

```text
[User fills PaymentTransferForm — Zod validated]
            │
            ▼
[decryptId(sharableId)]  ──► receiverAccountId
            │
            ▼
[getBankByAccountId]         [getBank(senderBankId)]
            │                          │
            └────────────┬─────────────┘
                         ▼
            [createTransfer (Dwolla)]
                         │
                         ▼
            [createTransaction (Appwrite)]
                         │
                         ▼
                router.push("/")
```

### 3. Aggregation (`getAccounts`)

- Fetches all bank documents for the user.
- Calls `accountsGet` + `institutionsGetById` for every bank in **parallel** via `Promise.all`.
- Returns normalized accounts plus `totalBanks` and `totalCurrentBalance`.
- Transactions pulled via paginated `transactionsSync` (cursor-based until `has_more = false`).
- Plaid transactions + internal Appwrite transfers are merged and date-sorted.

---

## Screenshots

Sign-Up

<img width="1916" height="1035" alt="Screenshot 2026-05-03 205125" src="https://github.com/user-attachments/assets/a9636478-aa72-4d02-a2af-a8d5d1712987" />
---

Home Dashboard

<img width="1891" height="1035" alt="Screenshot 2026-05-03 205253" src="https://github.com/user-attachments/assets/c0cf6a29-9e84-40c8-8b89-0308c05a4b91" />
---

Plaid Link

<img width="1914" height="1036" alt="image" src="https://github.com/user-attachments/assets/43fe0838-cffe-4c25-b6b7-a694e17d8340" />
---

My Banks 

<img width="1903" height="1031" alt="Screenshot 2026-05-03 205608" src="https://github.com/user-attachments/assets/baa706fa-e2e8-4f13-ab45-f9b8aa1f1b85" />
---

Transaction History 

<img width="1894" height="1034" alt="image" src="https://github.com/user-attachments/assets/69f1f841-c011-4e44-bf0f-1215a314a2c4" />
---
 
Payment Transfer
 
<img width="1914" height="1031" alt="Screenshot 2026-05-03 205825" src="https://github.com/user-attachments/assets/e1f04115-e979-4176-8c24-463c598bbba0" />
---
 

---

## Roadmap

- [ ] Multi-currency and non-US institutions (extend Plaid `country_codes`).
- [ ] Webhook-driven transaction sync (replace on-demand `transactionsSync`).
- [ ] Budgeting and insights — monthly category caps + balance forecasting.
- [ ] Pluggable payment rails — Stripe / UPI alongside Dwolla ACH.
- [ ] Mobile app sharing the same server actions via React Native.
- [ ] AI-assisted categorization personalized per user.
- [ ] Production-grade KYC beyond Dwolla's customer flow.
- [ ] Role-based shared / family accounts via Appwrite authorization rules.

---

## Limitations

- Operates against **Plaid Sandbox** and **Dwolla Sandbox** — no live banking partners or real money movement.
- **U.S.-only** institutions, **USD-only** transfer amounts.
- Both sender and receiver must be existing Horizon users with linked banks; there is no email-only "send to anyone" flow.
- Categorization is a **static rule-based map** and is not personalized per user.
- Sandbox identifiers (`TEST_USER_ID`, `TEST_ACCESS_TOKEN`) live in `constants/index.ts` for convenience and **must not** be used in production.
- Sentry captures errors but does not yet alert on business-level KPIs (e.g. failed-transfer rate, sign-up drop-off).
- Pagination on the transactions list is client-side after a full sync; very large histories should move to server-side cursors.

---

## Contributing

Contributions are welcome and appreciated.

1. **Fork** the repository.
2. Create a feature branch — `git checkout -b feature/your-feature`.
3. Commit your changes — `git commit -m "feat: add your feature"`.
4. Push to your fork — `git push origin feature/your-feature`.
5. Open a **Pull Request** describing the change.

Please run `npm run lint` and make sure the build passes before opening a PR.

---

## License

This project is released under the **MIT License**. See [`LICENSE`](LICENSE) for details.

---

## Acknowledgements

- **[Plaid](https://plaid.com/)** — bank account aggregation API.
- **[Dwolla](https://www.dwolla.com/)** — ACH payments infrastructure.
- **[Appwrite](https://appwrite.io/)** — open-source backend platform.
- **[Next.js](https://nextjs.org/)** — the React framework powering the App Router.
- **[shadcn/ui](https://ui.shadcn.com/)** — accessible, copy-paste UI components.
- **[TailwindCSS](https://tailwindcss.com/)** — utility-first CSS framework.
- **[Sentry](https://sentry.io/)** — application monitoring and error tracking.
- **[Chart.js](https://www.chartjs.org/)** — flexible JavaScript charting.

---

<div align="center">

**Built with care as a final-semester project at Sarala Birla University, Ranchi.**

If you found this useful, consider giving the repo a ⭐ on GitHub.

</div>

