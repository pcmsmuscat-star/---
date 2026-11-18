# Build "اتزان | نبض الأمان" (Ittizan) — warfarin & INR diary app

You are building a production-quality mobile app for Android and iOS. Work in phases, commit after each phase, and run the app/tests to confirm each phase works before moving on. Ask me before making decisions marked **(decision needed)**.

## 0. Product rules (never break these)

- Ittizan is a **diary and reminder** app for people taking warfarin. It **records and reminds; it never suggests or calculates a dose.** All medical decisions say "your clinic".
- Bilingual: **Arabic and English**, chosen at first launch, switchable in More → Language without restarting. Arabic mirrors the whole layout (tabs run right-to-left, back arrows point right, text aligns right, progress bars fill from the right). **Do not mirror**: numbers, INR values, phone numbers, patient ID, tablet pictures. Medical values use Western digits (2.5) by default.
- Every string, reminder, PDF and Guide entry exists in both languages. No hard-coded UI text.
- Accessibility: touch targets ≥ 44 pt, body text ≥ 16 pt, supports system large text, contrast ≥ 4.5:1, every icon button has a screen-reader label. Status is never shown by colour alone (always text and/or ↑ ↓ arrow).
- Tone of copy: calm, short, plain.
- Health data is private: encrypted at rest on the phone, app lock (biometric or PIN), notifications hide medicine name and dose by default.

## 1. Tech stack

- **Expo (React Native) + TypeScript**, `expo-router` for navigation.
- Local-first data: `expo-sqlite` (with encryption, e.g. SQLCipher via `op-sqlite` or encrypted fields with a key in `expo-secure-store`) + `drizzle-orm` for schema/migrations.
- i18n: `i18next` + `react-i18next`, RTL via `I18nManager` (handle the reload-free switch by driving layout direction from our own context rather than relying only on `I18nManager.forceRTL`).
- Notifications: `expo-notifications` (with "Taken" and "Snooze 15 min" actions).
- Biometrics: `expo-local-authentication`; secrets in `expo-secure-store`.
- Charts: `react-native-svg` (hand-built INR chart; no heavy chart lib needed).
- PDF report: `expo-print` + `expo-sharing`. CSV: plain string generation + `expo-file-system`.
- Fonts: **Plus Jakarta Sans** (Latin) and **IBM Plex Sans Arabic** (Arabic) via `@expo-google-fonts`. Arabic text gets ~10% more line height.
- Tests: Jest + React Native Testing Library for logic and key screens.
- Sync/pairing backend comes in a later phase **(decision needed: Supabase vs. MOH-hosted server)** — design the data layer so sync can be added without rewriting screens.

## 2. Design system (match exactly)

Visual style: clean white cards on a light-blue background, bright blue→cyan gradient hero cards, round icons with gradient rings, soft shadows, faint "network lines and dots" decoration in headers, and a small pop of yellow used sparingly.

```ts
export const colors = {
  bg: '#F2F7FD',          // app background (light blue)
  surface: '#FFFFFF',     // cards
  tint: '#E3EEFC',        // light-blue chips / icon backgrounds
  border: '#EDF2F9',      // list dividers
  inputBorder: '#CFDDF1',
  navy: '#0E2A5C',        // primary text, deep blue
  steel: '#2C5A93',       // page titles, row labels
  muted: '#4A5F80',       // secondary text
  blue: '#1E6BF0',        // primary action / links
  cyan: '#26CFD6',
  yellow: '#FFC93C',      // pop accent only (logo dot, today marker, plan-change marker)
  // status — always paired with text/arrow
  inRangeBg: '#DDF5F1', inRangeText: '#0B6B61',          // "In range"
  highBg: '#FDEBDD',   highText: '#8A3505', high: '#B54708', // "↑ High"
  lowBg: '#E3EDF8',    lowText: '#174C87',                 // "↓ Low"
  urgent: '#B42318',   urgentBg: '#FDE8E6',                // urgent care only
};
export const gradient = ['#1E6BF0', '#1AA6E6', '#26CFD6']; // 135°
export const radius = { card: 24, hero: 28, button: 18, pill: 999, input: 16 };
export const shadow = { card: '0 6px 18px rgba(14,42,92,0.06)', hero: '0 18px 36px rgba(30,107,240,0.30)' };
// type: page title 30/500 steel; hero number 42–46/800; section 17/700; body 16; meta 13–14 muted
```

Components to build once and reuse: `GradientCard`, `Card`, `GradientRingIcon` (44 px circle, 3 px gradient ring, white centre), `ValuePill` (outlined, e.g. "6 mg", "3.4"), `StatusChip` (in range / ↑ high / ↓ low), `SegmentedPill` (white track, gradient active segment), `PrimaryButton` (gradient), `SecondaryButton` (white), `TabletPicture` (draws a tablet from colour, shape, score line), `SyncChip`, `OfflineBanner`, `Skeleton`, `EmptyState`, `NetworkDecor` (svg lines + dots).

**Bottom tab bar:** white, rounded top corners (28), five tabs **Today, INR, Symptoms, Guide, More**. The active tab's icon sits in a raised 54 px gradient circle with a 4 px white border; inactive tabs are muted icons + labels.

**Logo:** rounded-square tile with the blue→cyan gradient; inside, a thin semi-transparent white ring, a white drop shape in the centre, and a small yellow dot on the ring at the top-right. No crosses, hearts or shields. Name: "اتزان" with tagline "نبض الأمان" (English: "Ittizan · Pulse of safety").

## 3. Screens (build in this order)

States every list/page must design: loading (skeleton, not spinner), empty (short explanation + main action), error (message + Try again; offline banner "You're offline. Changes will sync when you reconnect."), syncing chip ("Synced 2 min ago" / "Syncing…" / "Not synced"), locked (app-lock screen when returning after [1] minute).

### 3.1 Onboarding (first launch only, "step X of 8" dots, Back/Next, no tabs)
1. **Welcome & language** — logo, name, tagline, two big buttons "العربية" (gradient) and "English" (white). Slot at the top for the MOH logo + "المديرية العامة للخدمات الصحية لمحافظة مسقط".
2. **Medical disclaimer** — "Ittizan helps you record your doses and INR results. It does not give medical advice or change your dose. Always follow your clinic." + "I understand" checkbox gates Continue; Privacy policy link.
3. **New or existing file** — "I'm new: create my file" / "Join an existing file (second phone)".
4. **App lock** — Face ID/fingerprint, or 4–6 digit PIN (+ confirm; error "PINs don't match"), or Skip.
5. **About you** — name (optional), year of birth (optional), anticoagulant (Warfarin), brand (by country + Other), target INR low/high (default 2.0–3.0, steppers 0.1; error "Low must be below high."), reason (optional). Help: "Use the range your clinic gave you."
6. **My tablets** — 1–4 tablet strengths, each via the Tablet editor; brand presets.
7. **Dose plan** — same form as Change plan; may skip ("I'll add it later").
8. **Reminders & clinic** — dose time (default 6:00 PM), next INR test date, test reminders, clinic name/phone; Finish asks for notification permission; if denied show banner "Reminders are off. Turn on notifications in Settings."

### 3.2 Today tab
- Header: logo, "Ittizan اتزان", date, bell button, sync chip.
- **Gradient dose card**: "Today's dose", total mg large, tablet pictures with "1 × 5 mg peach" etc., reminder time, white "Mark as taken" button → taken state "Taken 6:12 PM · this phone" + Undo (10 s), links "Missed or held?" and "Dose plan". Other states: missed yesterday ("Did you take yesterday's dose?" Yes/No), held by clinic, no plan yet, "Changed for today" badge.
- Alert card when latest INR is out of range ("Your last INR was high. Contact your clinic." + Call clinic).
- Two cards: Last INR (value, status chip, mini sparkline over the target band) and Next INR test (date + "in X days").
- Time in range card: gradient ring %, three-part bar (↓ low / in range / ↑ high), "Based on X tests over Y months"; hidden until 2 tests.
- Quick actions list: Add INR result, Report symptom, Food & medicines.
- **Missed or held** bottom sheet: missed / held by clinic / different amount (tablet picker) / taken late (time); note. Copy: "Don't take a double dose unless your clinic tells you to."
- **Dose plan**: gradient weekly-total card with a 7-bar chart (today's bar yellow), list of days with tablet pictures and mg pills, "My tablets" cards, buttons Change plan / One-off change, Plan history link, "Plan updated by [phone] on [date]". Plan types: same daily, per weekday, alternating.
- **Tablet editor**: live gradient preview; strength, colour swatches (white, pink, brown, lavender, green, tan, blue, peach, teal, yellow, custom), shape (round, oval, capsule), score line (none/half/quarter — none disables half tablets), imprint, optional photo; note "Tablet colours differ between brands and countries. Check against your own tablets."
- **Change plan**: start date, plan type, per-day mg auto-split into tablets (choose combination), prescribed by, note; shows old vs new weekly total (info only); confirm screen; error "This dose can't be made with your tablets…". **One-off change**: date, amount, reason, note.

### 3.3 INR tab
- Title + gradient "Add result" pill; period segmented pill (3 mo / 6 mo / 1 yr / All).
- **Gradient chart card**: time-in-range %, SVG chart with shaded target band, faint bars + white line, low point labelled "↓ 1.8" (navy chip), high point "↑ 3.4" (white chip, orange text), yellow diamond markers for plan changes, ring markers for symptoms; legend.
- Results list: gradient-ring icon, date, source · status, value pill. Empty: "No INR results yet. Add your first result to see your chart."
- **Add/edit result**: big number pad (0.8–10.0, one decimal, ±0.1), date/time (no future), source (Hospital lab / Clinic fingerstick / Home meter), next test date, instruction received (No change / New plan → Change plan / One-off change), note; edit mode has Delete (confirm).
- **Abnormal INR alert** (full screen after save): coloured gradient header with the big value and badge, white message card, buttons Call clinic / I've contacted them / Close. Variants: High, Very high (adds "If you have any bleeding, go to emergency care now." + Call emergency), Low. Log that it was shown and what the user tapped.
- **Time in range details**: Rosendaal method, low/in/high split, adherence (on time / late / missed), thin-data warning.

### 3.4 Symptoms tab
- Permanent urgent card (red icon, red "Call emergency services" button): "Get urgent care now if you have black or bloody stools, vomiting blood, a severe headache, chest pain, or bleeding that won't stop."
- Segmented pill Symptoms | Life events; big gradient action card "Report a symptom" / "Log a life event"; recent list with tag pills; History link.
- **Report a symptom** (3 steps): multi-select grid (bleeding, clot signs, other), details (severity, started, still happening, location, up to 3 photos, note), review with "Include in clinic report" toggle. Urgent symptoms or "Severe" open the **Urgent care card** immediately (no dismiss without choosing Call emergency / Call my clinic / I'm getting help).
- **Life event**: diet change, alcohol, illness, new/stopped medicine (link to Guide), missed doses, travel, procedure/dental, other. Medicine events show "Tell your clinic about this change."
- Report detail (edit/delete, which phone logged it) and History (filter + search).

### 3.5 Guide tab (offline, bundled, bilingual, reviewed by [PHARMACIST NAME] with review date)
- Segmented pill Food & drink | Medicines; pill search field (searches Arabic + English names); gradient key-message card with a yellow "i" badge; category chips; list rows with gradient-ring initial, English + Arabic name, one-line effect, outlined label chip.
- Food labels: High / Moderate / Low vitamin K, May raise INR, Ask your clinic. Medicine labels: Major / Moderate / Minor / Usually safe, check dose.
- Food detail and Medicine detail pages with "Log a diet change" / "I've started this medicine" (prefills a life event).
- Put Guide content in `assets/guide/*.json`; use clearly marked placeholder entries until the pharmacist supplies reviewed content.

### 3.6 More tab
- Gradient Patient ID card (masked `IZ-••••-4821`, Show/Hide), "2 of 2 phones on this file" link.
- Rows: Clinic & emergency contacts, Emergency card (bilingual, save as image), Clinic report (PDF; period, sections, language), Export/Import CSV (with preview "X rows, Y errors"), Reminders (privacy toggle on by default, repeat after [30] min, which phones), Target range & alerts, Tablets & dose plan, App lock, Language (+ digits style, week start Sat/Sun/Mon), About & disclaimer, Privacy & delete data (type DELETE + app lock).

### 3.7 Two phones, one patient file (later phase)
QR / Patient ID + one-time 6-digit code (expires in 10 min, single use), approval on the first phone, roles Patient/Carer, max 2 phones, every entry records which phone logged it, conflict prompt when both phones mark the same dose. The Patient ID alone never grants access.

## 4. Data model (local SQLite now, mirrors the future backend)

patient_file, tablets (strength, colour, shape, score, imprint, photo), dose_plans (start/end, type, per-day amounts + tablet combinations, prescribed_by, note), dose_log (date, planned, actual, status taken/late/missed/held/changed, time, logged_by_phone, note), inr_results (value, datetime, source, next_test, instruction, note, alert_shown, alert_response), symptoms, life_events, contacts, reminder_settings, phones. Every row has `id`, `created_at`, `updated_at`, `logged_by_phone`.

## 5. Notifications copy (privacy mode on by default)

| Trigger | Privacy on | Privacy off |
|---|---|---|
| Dose time | "Time for your evening reminder" | "Take 6 mg: 1 × 5 mg + 1 × 1 mg" |
| Not marked after 30 min | "Reminder: tap to confirm" | "Did you take your 6 mg warfarin?" |
| Day before INR test | "Appointment tomorrow" | "INR test tomorrow at [clinic]" |
| Morning of INR test | "Appointment today" | "INR test today" |

All in English and Arabic.

## 6. Phases

1. Project setup, design tokens, fonts, i18n + RTL context, reusable components, tab bar, app lock shell. Build a hidden "Design gallery" screen showing every component in English and Arabic.
2. Onboarding (all 8 steps) + local database.
3. Today tab, Dose plan, Tablet editor, Change plan, One-off change, Missed/held sheet, dose reminders.
4. INR tab, Add/edit, Abnormal alert, Time in range (Rosendaal) with unit tests.
5. Symptoms tab, report flow, urgent card, life events, history.
6. Guide tab with placeholder bilingual JSON content.
7. More tab: contacts, emergency card, PDF report, CSV export/import, reminders, settings, delete data.
8. (Later) Backend, sync and two-phone pairing — stop and ask me before starting.

After each phase: run type-check, lint and tests, start the app, check every new screen in **both English and Arabic (RTL)** and at large text size, then summarise what was built and anything still open.
