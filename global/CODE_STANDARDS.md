# CODE_STANDARDS.md — 4th-IR Clean Code Standards

These principles apply to all code written at 4th-IR. The goal is code that is intuitive, readable, and maintainable by anyone on the team — including your future self.

---

## Core principles

**DRY — Don't Repeat Yourself.** If the same logic appears in more than one place, extract it into a shared function or hook.

**KISS — Keep It Simple.** The simplest solution that works is correct. Avoid over-engineering. Do not add abstractions until a pattern clearly repeats.

**YAGNI — You Aren't Gonna Need It.** Do not write code for features you might need later. Write for what is required now.

**Separation of Concerns.** Business logic lives in hooks and utilities, not components. Data access is separate from UI rendering.

---

## Naming

- Use clear, descriptive names. A reader should understand the purpose without reading the implementation.
- No single-letter variables except loop counters (`i`, `j`).
- No cryptic abbreviations (`usr`, `cfg`, `d`).
- Functions and variables: `camelCase`. Components: `PascalCase`. Constants: `SCREAMING_SNAKE_CASE`. Files: `kebab-case`.

```ts
// Bad
const d = 7
function q(x, y) { return x + y }

// Good
const daysInWeek = 7
function sumNumbers(a: number, b: number): number { return a + b }
```

---

## Functions

- One function, one job. If a function does more than one thing, split it.
- Keep functions under 20–30 lines. If longer, it is doing too much.
- Maximum 3 parameters. Bundle additional parameters into an object.

```ts
// Bad
function processData(flag, data, id, aFilter, bFilter, cFilter) {}

// Good
function processData(flag: boolean, data: Data, filters: FilterParams) {}
```

---

## Comments

- Code should be self-documenting. A good name is better than a comment.
- Do not write comments that restate what the code does.
- Write comments that explain *why*, not *what*.
- Never leave commented-out code in a commit.

---

## Indentation & formatting

- 2 spaces for indentation (TypeScript/JavaScript). 4 spaces for Python.
- Never mix tabs and spaces.
- Prettier handles formatting automatically — do not override it manually.

---

## TypeScript

- Use strict mode. No `any` unless absolutely unavoidable and commented with a reason.
- Define interfaces for all API response shapes.
- Use optional chaining (`?.`) and nullish coalescing (`??`) to handle missing values safely.

```ts
// Bad
const name = data.user.profile.name // crashes if any level is null

// Good
const name = data?.user?.profile?.name ?? 'Unknown'
```

---

## Pre-commit checklist

Before every commit, confirm:
- Variable and function names are clear and descriptive
- Each function does only one thing
- No function has more than 3 parameters (or they are grouped into an object)
- No commented-out code
- No repeated logic that should be extracted
- Indentation is consistent
- No `console.log` statements left in production code
