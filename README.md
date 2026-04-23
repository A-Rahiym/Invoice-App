# Invoice App

A responsive invoice management app built with Next.js, React, TypeScript, Tailwind CSS, and Zustand.

## Setup Instructions

### Prerequisites

- Node.js 20+ recommended
- npm

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### Build and run production

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

## Architecture Explanation

### Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Zustand for global state
- Tailwind CSS v4 + CSS custom properties

### Project Structure

- `app/`: routes, layout, and global styles
- `components/`: shared UI primitives (`AppChrome`, `Button`, `Modal`, `InvoiceModal`)
- `features/`: feature modules (`invoices`, `InvoiceDetails`, `InvoiceModal`)
- `store/`: Zustand stores (`invoiceStore`, `themeStore`)
- `types/`: shared domain types
- `utils/`: formatting, localStorage safety wrappers, mock seed data, form helpers

### Data Flow

- Invoice state is centralized in `store/invoiceStore.ts`.
- The store starts from mock data, then hydrates from localStorage on the client.
- CRUD updates are written back to localStorage after each state change.
- Theme state is managed by `store/themeStore.ts` and initialized in `components/Themeinitializer.tsx`.

### Routing

- `/` redirects to `/invoices`
- `/invoices` shows dashboard, filtering, and create flow
- `/invoiceDetails/[id]` shows invoice details + state transition actions

## Trade-offs

- Client-side persistence only: using localStorage keeps setup simple but data is browser/device scoped.
- No backend/API layer: faster development and offline friendliness, but no multi-user sync.
- Modal-based create/edit UX: quick interactions, but large forms can be harder to manage than dedicated pages.
- Hydration-safe invoice loading: avoids SSR mismatches, but introduces a small client hydration step.
- Minimal domain guardrails in store transitions: UI enforces most status rules; stronger invariants could move into store actions.

## Accessibility Notes

- Dialog semantics are present in `components/Modal.tsx` (`role="dialog"`, `aria-modal`, `aria-labelledby`).
- Overlay close button includes an accessible label.
- Icon-only controls use `aria-label` where needed (for example, theme toggle).
- Decorative SVGs are marked with `aria-hidden` when appropriate.
- Invoice modal supports closing via Escape and overlay click.
- Filter interaction uses native checkbox controls in a popover card.

### Accessibility Gaps / Next Iteration

- Add focus trapping inside dialogs.
- Restore focus to trigger after closing dialogs/popovers.
- Announce validation and state changes via ARIA live regions.
- Run automated audits (axe/Lighthouse) and keyboard-only walkthroughs.

## Improvements Beyond Requirements

- Responsive shell (`AppChrome`) with mobile/tablet header and desktop sidebar.
- Persisted light/dark theme.
- Multi-select status filter with popover card UI.
- Status transition UX rules:
	- Draft invoices remain editable.
	- Pending invoices can be marked as Paid.
	- Paid invoices do not expose a transition back to Draft.
- Empty states for dashboard and invoice-details not-found scenarios.
- Typed domain model and reusable feature-level components for maintainability.
