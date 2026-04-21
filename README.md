# Food Delivery Orders App (React + Vite)

This project is implemented using pure React with Vite and follows:

- React Context
- useReducer
- React Router

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file from `.env.example`:

```bash
cp .env.example .env
```

3. Add your credentials in `.env`:

- `VITE_AUTH_ID`
- `VITE_AUTH_PIN`
- `VITE_DATASET_NAME`

4. Start the app:

```bash
npm run dev
```

## Mandatory Routes

- `/orders`
- `/orders/:id`
- `/filter`
- `/stats`

## Architecture Rules Followed

- Data flow is API -> Context -> Reducer.
- All fetched data is stored in Context as the single source of truth.
- All updates are dispatched through reducer actions.
- No hardcoded dataset credentials in source code.
- Derived values are computed in pages/components using `map`, `filter`, and `reduce`.

## Required Test IDs

- List rendering: `data-testid="order-item"`
- Filter input: `data-testid="filter-input"`
- Stats page: `data-testid="total-orders"`
- Stats page: `data-testid="delivered-orders"`
- Stats page: `data-testid="cancelled-orders"`
