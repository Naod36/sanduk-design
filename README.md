# Sanduk — UI Prototype & Design System (v0.7)

Static interactive prototype for **Sanduk**, the modern local-first personal & household finance tracker.

🌐 **Live Demo:** [https://naod36.github.io/sanduk-design/](https://naod36.github.io/sanduk-design/)

---

## What's Inside

The prototype models the full user journey and real design flows of the Sanduk React Native app across **38 screens**, including:

1. **Language & Onboarding Flow**
   - 3-tab segmented language switcher on Welcome (English / አማርኛ / More)
   - Searchable bottom sheet language modal
   - 4-step device-first onboarding (Base Currency → First Account → 4-Digit PIN → Biometrics)
2. **Core Navigation & Floating Dock**
   - Floating icon capsule dock with raised action button
   - Theme toggle (Light / Dark / Side-by-side comparison)
   - Viewport toggle (Desktop grid vs. Mobile swipeable frame with touch gestures)
3. **Storage & Cloud Sync Status**
   - **Interactive Sync Pill** with status indicator (● Synced / ↻ Syncing)
   - **Local Storage Popover** explaining device SQLite safety, cloud connection health, and pending change queue
4. **Account & Bank Branding**
   - Account picker featuring **Bank Name + Masked Account Number Chips** (e.g. CBE •••• 4821, Telebirr •••• 7712, Awash Bank •••• 1042)
5. **Dual Finance Modes**
   - **Personal Ledger (Private)** vs. **Household Vault (Shared)**
   - Privacy notices and private account indicators
6. **Tactile Quick-Add Experience**
   - Amount-first modal bottom sheet
   - Custom 3x4 numeric keypad with haptic-ready keys
   - Instant category chips and account picker
7. **Transactions & Activity**
   - Day-grouped feed with daily subtotals (Today, Yesterday, etc.)
   - Real-time search filter and category pill filters
   - Full transaction receipt detail view with member attribution (Recorded by Naod) and audit trails
8. **Loans & Debt Tracking**
   - Amortized loan schedule with percentage progress bars
   - Peer IOUs and repayment schedules
9. **Localization (አማርኛ)**
   - Ethiopic typography fallback via Noto Sans Ethiopic
   - Native financial terminology (ጠቅላላ ሀብት, የጋራ, የግል, ዕዳዎች)

---

## Automated Test Suite

The repository includes an automated test runner verifying design tokens, screen integrity, responsive viewports, and interactive triggers:

### Running via Terminal
```bash
# Run standalone test runner
npm test
# or
node test.js
```

### Running In-Browser
Open `index.html` in any modern web browser and click the **🧪 Run UI Tests** button in the top toolbar to execute live assertions and see the real-time test badge.

---

## Design System Tokens

- **Palette**: Neutral ink (`#18181B`) with single vivid orange accent (`#F97316`)
- **Semantic Colors**: Income (`#16A34A`), Expense (`#DC2626`), Transfer (`#2563EB`)
- **Typography**: Inter (Latin & numbers) + Noto Sans Ethiopic (glyphs)
- **Viewport**: 375 × 812 (iOS reference), fully responsive
