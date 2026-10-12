import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const htmlPath = path.join(__dirname, 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  \x1b[32m✔\x1b[0m ${name}`);
    passed++;
  } catch (err) {
    console.error(`  \x1b[31m✖\x1b[0m ${name}`);
    console.error(`    ${err.message}`);
    failed++;
  }
}

console.log('\n\x1b[1m\x1b[36m=== Sanduk Prototype Automated Test Suite ===\x1b[0m\n');

// 1. Structure & Meta
test('HTML5 document has DOCTYPE, UTF-8 charset, and mobile viewport', () => {
  assert.ok(html.includes('<!doctype html>'), 'Missing <!doctype html>');
  assert.ok(html.includes('<meta charset="utf-8"'), 'Missing UTF-8 charset meta');
  assert.ok(html.includes('name="viewport"'), 'Missing viewport meta');
  assert.ok(html.includes('<title>'), 'Missing document title');
});

test('Google Fonts link includes Noto Sans Ethiopic for Amharic glyph support', () => {
  assert.ok(html.includes('fonts.googleapis.com'), 'Missing Google fonts URL');
  assert.ok(html.includes('Noto+Sans+Ethiopic'), 'Missing Noto Sans Ethiopic font');
});

// 2. CSS Design Tokens
test('CSS root variables define all brand design tokens', () => {
  const requiredTokens = [
    '--bg', '--surface', '--surface2', '--line',
    '--text', '--muted', '--muted2', '--ink', '--ink2',
    '--accent', '--income', '--expense', '--transfer', '--warn'
  ];
  for (const token of requiredTokens) {
    assert.ok(html.includes(token), `Missing CSS design token ${token}`);
  }
});

test('CSS includes full dark mode overrides with [data-theme="dark"]', () => {
  assert.ok(html.includes('[data-theme="dark"]'), 'Missing dark theme selector');
  assert.ok(html.includes('--bg:#0A0A0A') || html.includes('--bg:#0a0a0a'), 'Missing dark background token');
});

// 3. Toolbar Controls
test('Toolbar controls include theme switches and responsive view toggles', () => {
  assert.ok(html.includes('id="t-light"'), 'Missing Light theme button');
  assert.ok(html.includes('id="t-dark"'), 'Missing Dark theme button');
  assert.ok(html.includes('id="t-both"'), 'Missing Show both theme button');
  assert.ok(html.includes('id="v-desktop"'), 'Missing Desktop view button');
  assert.ok(html.includes('id="v-mobile"'), 'Missing Mobile view button');
});

// 4. Lucide Vector Icon Library
test('Lucide vector icon paths map contains required navigation and action glyphs', () => {
  assert.ok(html.includes('const P={') || html.includes('const P = {'), 'Missing icon paths map P');
  const requiredIcons = ['home', 'cart', 'utensils', 'shield', 'landmark', 'user', 'bell', 'check'];
  for (const ic of requiredIcons) {
    assert.ok(html.includes(`${ic}:`), `Missing icon path for ${ic}`);
  }
});

// 5. Screen Gallery
test('Screens gallery array is defined and contains valid tuples', () => {
  assert.ok(html.includes('const screens=['), 'Missing const screens array');
  const matchCount = (html.match(/\["\d+[^"]*",\s*"/g) || []).length;
  assert.ok(matchCount >= 25, `Expected at least 25 screens, found ${matchCount}`);
});

test('Phone frames render within proper 375x812 viewport container', () => {
  assert.ok(html.includes('width:375px'), 'Missing 375px phone width rule');
  assert.ok(html.includes('height:812px'), 'Missing 812px phone height rule');
});

test('Screen 32 features interactive sync pill and SQLite storage popover', () => {
  assert.ok(html.includes('32 · Sync Status & Storage Popover'), 'Missing Screen 32 in screens array');
  assert.ok(html.includes('Saved on device:'), 'Missing Saved on device text');
  assert.ok(html.includes('SQLite'), 'Missing SQLite indicator');
  assert.ok(html.includes('Cloud connection:'), 'Missing Cloud connection text');
});

test('Screen 33 features bank branding and account number chips', () => {
  assert.ok(html.includes('33 · Account Picker with Account Number Chips'), 'Missing Screen 33 in screens array');
  assert.ok(html.includes('CBE •••• 4821'), 'Missing CBE account number chip');
  assert.ok(html.includes('Commercial Bank of Ethiopia'), 'Missing bank name');
});

test('Screen 34 features personal vs household dual ledger mode', () => {
  assert.ok(html.includes('34 · Finance Mode: Personal vs Household'), 'Missing Screen 34 in screens array');
  assert.ok(html.includes('Personal (Private)'), 'Missing Personal mode toggle');
  assert.ok(html.includes('Household Vault'), 'Missing Household Vault toggle');
});

test('Screen 35 features quick-add sheet with numeric keypad and category chips', () => {
  assert.ok(html.includes('35 · Quick-Add Sheet & Numeric Keypad'), 'Missing Screen 35 in screens array');
  assert.ok(html.includes('Save Expense'), 'Missing Save Expense action');
  assert.ok(html.includes('keypad'), 'Missing keypad grid container');
});

test('Screen 36 features day-grouped transactions feed with live search', () => {
  assert.ok(html.includes('36 · Transactions Feed (Day-Grouped)'), 'Missing Screen 36 in screens array');
  assert.ok(html.includes('TODAY'), 'Missing TODAY group header');
  assert.ok(html.includes('Search notes, merchants, or amounts...'), 'Missing search placeholder');
});

test('Screen 37 features transaction detail modal with audit trail', () => {
  assert.ok(html.includes('37 · Transaction Detail & Audit Trail'), 'Missing Screen 37 in screens array');
  assert.ok(html.includes('Recorded by'), 'Missing Recorded by member attribution');
  assert.ok(html.includes('Delete Transaction'), 'Missing Delete Transaction action');
});

test('Screen 38 features loan and debt amortization tracking', () => {
  assert.ok(html.includes('38 · Loan & Debt Tracker'), 'Missing Screen 38 in screens array');
  assert.ok(html.includes('Car Loan — Awash Bank'), 'Missing Car Loan Awash Bank');
  assert.ok(html.includes('65% Paid'), 'Missing 65% paid status');
});

console.log(`\n\x1b[1mSummary: ${passed} passed, ${failed} failed\x1b[0m\n`);

if (failed > 0) {
  process.exit(1);
}
