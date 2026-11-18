This is an Expo/React Native mobile application. Prioritize mobile-first patterns, performance, and cross-platform compatibility.

## Expo has changed — do not trust your training data

Expo ships breaking changes every SDK release. APIs you remember are likely renamed, moved, or removed. Before writing any code that touches an Expo, EAS, or React Native API:

1. Read the major version of the `expo` package in `package.json`.
2. Fetch the matching versioned docs: `https://docs.expo.dev/versions/v<major>.0.0/`
3. For anything else, fetch https://docs.expo.dev/llms.txt — an index of all Expo docs with corrections to common LLM misconceptions. Follow its links to the specific page you need; never answer from memory.

## Commands

Use `bunx` instead of `npx` if the project uses bun (`bun.lock` present).

```bash
npx expo install <package>  # ALWAYS use instead of npm/yarn/pnpm/bun add — resolves SDK-compatible versions
npx expo start              # start the dev server
npx expo lint               # lint
npx tsc --noEmit            # typecheck
npx expo-doctor             # diagnose dependency and config issues
npx expo install --fix      # fix incompatible package versions
```

Run lint and typecheck before declaring any task done.

## Navigation & Routing

- Use **Expo Router** for all navigation. Routes live in `src/app/` — every file there is a screen, `_layout.tsx` files define navigators. Keep non-route code (components, hooks, utils) outside `src/app/`.
- Import `Link`, `router`, and `useLocalSearchParams` from `expo-router`.
- Docs: https://docs.expo.dev/router/introduction.md

## Building with EAS

Use EAS to build, sign, and submit the app in the cloud (`eas build`, `eas submit`) and to ship over-the-air updates (`eas update`) — no local Xcode or Android Studio required. Run EAS CLI as `bunx eas-cli <command>` in Bun projects, or `npx eas-cli@latest <command>` otherwise; substitute that for bare `eas` in docs examples.
Docs: https://docs.expo.dev/eas/index.md

## Rules

- If `ios/` and `android/` directories do not exist, they are generated (Continuous Native Generation). Never create or edit them by hand — configure native behavior in `app.json` and config plugins.
- Expo Go only includes its bundled native modules. After adding a library with native code, the app needs a development build: `npx expo run:ios|android` locally, or `eas build --profile development`.
- Prefer recommended Expo modules over third-party libraries, and check your available skills before adding dependencies. Docs: https://docs.expo.dev/versions/latest/index.md

## This project: اتزان | نبض الأمان (Ittizan)

Warfarin and INR diary. Read `README.md` and `docs/BUILD_PLAN.md` before changing anything.

- The app records and reminds; it never suggests or calculates a dose. Medical decisions say "your clinic".
- No hard-coded UI text: add every string to both `src/i18n/en.ts` and `src/i18n/ar.ts` (the i18n test enforces parity).
- Use `AppText` for text and `Num` for numbers, INR values, phone numbers and IDs (never mirrored). Use tokens from `src/theme/tokens.ts`; don't introduce new colours.
- Layout direction comes from `useLanguage().isRTL` and the root `direction` style. Use `flexDirection: 'row'` and start/end, not left/right, so Arabic mirrors automatically.
- Status is never colour alone (always "In range", "↑ High", "↓ Low"). Red is only for urgent care.
- Before finishing: `npm run typecheck`, `npm run lint`, `npm test`, and check new screens in English and Arabic (More → Design gallery has a language switch).
- This environment can't reach api.expo.dev: run `npx expo install` with `EXPO_OFFLINE=1`.
