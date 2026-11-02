# vesta-next

Next.js + TypeScript scaffold using Feature-Based Architecture.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4 (CSS-first, no `tailwind.config`)
- shadcn/ui, React Hook Form, Zod, Sonner, Axios, xlsx

## Structure

```text
src/
├── actions/      # Server Actions
├── api/          # API infrastructure
├── app/          # Next.js routing, layouts, error boundaries, metadata
├── components/   # Shared UI (components/ui for shadcn/ui)
├── constants/    # Shared constants
├── features/     # Feature-based business logic (feature-name/{components,hooks,services,schemas,types,constants,utils})
├── hooks/        # Globally reusable hooks
├── lib/          # Shared library configuration
├── schemas/      # Shared Zod schemas
├── types/        # Shared TypeScript types
├── utils/        # Global utilities (cn.ts)
└── proxy.ts
```

Rules:

- `app` owns routing only; business logic lives in `features`.
- No global state management library (no Redux/Zustand/MobX).
