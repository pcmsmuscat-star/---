# اتزان | نبض الأمان — Ittizan

A warfarin and INR diary for Android and iOS, in Arabic and English.
Ittizan **records and reminds; it never suggests or changes a dose.** Medical decisions always point to "your clinic".

## Status

| Phase | Scope | State |
|---|---|---|
| 1 | Project setup, design tokens, fonts, Arabic/English with right-to-left, shared components, five-tab bar, app-lock shell, design gallery | ✅ Done |
| 2 | Onboarding (8 steps) + local encrypted database | Next |
| 3 | Today, dose plan, tablet editor, plan changes, missed/held, dose reminders | |
| 4 | INR tab, add/edit, abnormal alert, time in range | |
| 5 | Symptoms, urgent-care card, life events, history | |
| 6 | Guide (food & medicines, bilingual, pharmacist-reviewed) | |
| 7 | More: contacts, emergency card, PDF report, CSV, reminders, settings | |
| 8 | Backend, sync, two-phone pairing (decision needed: Supabase vs MOH-hosted) | |

The full product and design brief is in [`docs/BUILD_PLAN.md`](docs/BUILD_PLAN.md).

## Run it

```bash
npm install
npx expo start
```

Then open it in Expo Go on a phone, or press `w` for a web preview. Biometrics and secure storage need a development build (`npx expo run:android` / `run:ios`, or `npx eas-cli@latest build --profile development`).

## Checks

```bash
npm run typecheck
npm run lint
npm test
```

## Project layout

```
src/
  app/            Expo Router screens: (tabs)/index, inr, symptoms, guide, more; gallery
  components/     Shared UI: AppText/Num, cards, buttons, chips, TabletPicture, TabBar, Screen…
  theme/          Design tokens (colours, gradient, radius, shadow) and fonts
  i18n/           English + Arabic strings and the language/direction provider
  lock/           App lock: timeout logic, PIN hashing, lock screen
  domain/         Pure logic (INR status, validation)
  lib/            Storage and date helpers
```

## Design rules (short)

- Colours: white cards on light blue `#F2F7FD`, deep blue `#0E2A5C`, blue→cyan gradient `#1E6BF0 → #1AA6E6 → #26CFD6`, yellow `#FFC93C` only as a small accent.
- Status is never colour alone: "In range", "↑ High", "↓ Low". Red is only for urgent care.
- Arabic mirrors the whole layout (set by `direction` on the root view, so switching language needs no restart). Numbers, INR values, phone numbers, IDs and tablet pictures are never mirrored — use `<Num>` for them.
- Every string lives in `src/i18n/en.ts` and `src/i18n/ar.ts`; a test fails if a key is missing in either language.
- Touch targets ≥ 44, body text ≥ 16, every icon-only button has an accessibility label.

## Open items

- MOH logo and official emergency number (placeholder `9999`) to be confirmed.
- App identifiers `com.ittizan.app` are placeholders — change before the first store build.
- Guide content needs pharmacist review before release.
