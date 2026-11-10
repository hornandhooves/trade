# Trade Toolkit

A mobile trading calculator and learning companion (Expo / React Native / TypeScript).
Each feature is a self-contained module with a calculator and a short lesson.

## Run

```
npm install
npx expo start
```

Scan the QR code with the Camera app on your iPhone (needs the free **Expo Go** app).

## Add a new feature

1. Create `src/modules/<name>/` with `Screen.tsx`, `index.ts` (exports an `AppModule`) and, for calculators, a pure `calc.ts`.
2. Add it to the list in `src/modules/index.ts`. It shows up in the tab bar.

Shared UI pieces (`Field`, `Result`, `Lesson`, ...) live in `src/ui/components.tsx`.

## Modules

- **Position size**: how many units to buy for a given account risk and stop loss.
- **Risk / reward**: R:R ratio and break-even win rate for a planned trade.

Educational only, not financial advice.
