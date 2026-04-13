🧾 SHOPWISE PROJECT BLUEPRINT
1. 📌 Product Overview
Name

ShopWise

Tagline

Shop smarter using real-world grocery prices.

Description

ShopWise is a collaborative grocery price intelligence platform powered by real user receipts.
Users scan receipts to build a shared database of real product prices across markets.
Other users can create shopping lists and discover the cheapest and nearest place to buy.

2. 🎯 Product Vision
Mission

Help people make smarter grocery decisions using real price data.

Vision

Become the most trusted source of real-world grocery pricing, driven by community data.

Core Value

Real data (not scraped, not estimated)

Community-powered

Actionable insights

3. 💡 Problem Statement

Users today:

don’t know where it’s cheaper to shop

rely on outdated or unreliable price info

waste time comparing manually

miss better opportunities nearby

Markets:

struggle to target the right customers effectively

4. 🚀 Solution

ShopWise solves this by:

Collecting real price data via receipts

Structuring and storing product prices

Allowing users to create shopping lists

Recommending the best market based on:

price

proximity

availability (future)

5. 🧠 Core Concepts
Receipt

Represents a real purchase made by a user.

Market

The store where the purchase happened.

Product

A normalized representation of an item.

Price Record

A historical price observation of a product in a market.

Shopping List

A list of items the user wants to buy.

Recommendation

The result of comparing markets for a given list.

6. 🧩 Core Modules
MVP Modules

Users

Receipts

Markets

Products

Price Records

Shopping Lists

Recommendations

Future Modules

Promotions

Analytics

Rewards

Plans / Subscription

7. 🏗️ System Architecture
Backend Stack

Node.js

TypeScript

Express

Prisma ORM

PostgreSQL

Zod (validation)

Swagger (documentation)

Backend Structure
src/
├── modules/
│   ├── users/
│   ├── receipts/
│   ├── markets/
│   ├── products/
│   ├── price-records/
│   ├── shopping-lists/
│   └── recommendations/
├── shared/
│   ├── infra/
│   ├── errors/
│   ├── middlewares/
│   ├── utils/
│   └── types/
├── routes/
├── app.ts
├── server.ts
└── swagger.ts
8. 🧱 Module Architecture Pattern

Each module follows this structure:

module/
├── controllers/
├── services/
├── repositories/
├── schemas/
├── dtos/
├── types/
└── docs/
Responsibilities
Controllers

Handle HTTP requests

Call services

Return responses

Services

Business logic

Orchestrate operations

Repositories

Data access (Prisma)

Schemas

Validation (Zod)

DTOs

Data contracts

9. 🗄️ Data Model (Conceptual)
Entities
User

id

name

email

createdAt

Market

id

name

cnpj

address

latitude

longitude

Receipt

id

userId

marketId

total

date

ReceiptItem

id

receiptId

productId

nameRaw

price

Product

id

nameNormalized

PriceRecord

id

productId

marketId

price

date

ShoppingList

id

userId

name

ShoppingListItem

id

listId

productName

10. 🔄 Core Flows
Flow 1 — Receipt ingestion

User scans receipt

Data is parsed

Market is identified

Items are extracted

Price records are created

Flow 2 — Shopping recommendation

User creates a shopping list

System fetches latest prices

Prices grouped by market

Total estimated per market

Markets ranked by:

cheapest

nearest

best cost-benefit

Flow 3 — Price intelligence

Aggregate price records

Show trends

Show variation

Provide insights

11. 🧪 MVP Scope
Included

Create receipt

Store products and prices

Create shopping list

Compare markets

Basic recommendation

Excluded (future)

Promotions

Rewards system

Advanced analytics

AI normalization

Premium plans

12. 📊 Recommendation Logic (MVP)

Basic approach:

For each item in list:

get latest price per market

Sum prices per market

Sort markets by total price

Add distance factor

Output:

Cheapest market

Closest market

Best value

13. 🧠 Future Intelligence

Product normalization (AI)

Price prediction

Personalized suggestions

Smart substitutions

14. 🎯 Growth Strategy
Data acquisition

receipt scanning

incentives (future)

Retention

dashboards

price history

savings insights

Monetization

premium users

market promotions

15. 🎁 Rewards Strategy (Future)

points per receipt

contribution levels

unlock features

gamification

16. 🧾 Code Standards
Language

All code in English.

Rules

Controllers = thin

Services = logic

No business logic in routes

Validate all inputs

Comment important decisions

Example
/**
 * Creates a new receipt.
 *
 * This service:
 * - validates input
 * - links to a market
 * - stores receipt data
 * - generates price records
 */
17. 🌳 Git Strategy
Branches

main

develop

feature/*

bugfix/*

hotfix/*

Commits

feat:

fix:

refactor:

docs:

chore:

18. 📌 Jira Structure
Epics

Project Foundation

Core Domain Modeling

Receipt Ingestion

Shopping Lists

Recommendation Engine

Analytics

Rewards

Promotions

19. 🧭 Development Phases
Phase 1 — Foundation

setup backend

setup DB

setup structure

Phase 2 — Domain

define entities

implement models

Phase 3 — Receipts

create receipt endpoint

persist data

Phase 4 — Lists

create lists

manage items

Phase 5 — Recommendations

compare prices

rank markets

Phase 6 — Intelligence

history

analytics

20. ✅ Definition of Done

A feature is done when:

code implemented

validation added

service layer used

Swagger documented

tested manually

no TypeScript errors