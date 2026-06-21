import type { Account, Category, Transaction, SpendDay, CategorySpend, Insight, User } from '../types';

export const user: User = { name: 'Nepul', email: 'nepul@expense.app', initials: 'N' };

export const accounts: Account[] = [
  { id: 'a1', name: 'Nabil Bank · Salary',  type: 'bank',   balance: 184320, last4: '4421', color: '#14b8a6' },
  { id: 'a2', name: 'eSewa Wallet',          type: 'wallet', balance: 8240,   last4: '—',    color: '#22d3ee' },
  { id: 'a3', name: 'Khalti',                type: 'wallet', balance: 3120,   last4: '—',    color: '#a78bfa' },
  { id: 'a4', name: 'NIC Asia Credit Card',  type: 'card',   balance: -18450, last4: '0093', color: '#f97316' },
  { id: 'a5', name: 'Cash',                  type: 'cash',   balance: 4200,   last4: '—',    color: '#94a3b8' },
];

export const categories: Category[] = [
  { id: 'groceries',    label: 'Groceries',     color: '#14b8a6' },
  { id: 'food',         label: 'Food & Drink',  color: '#f59e0b' },
  { id: 'transport',    label: 'Transport',     color: '#60a5fa' },
  { id: 'rent',         label: 'Rent',          color: '#a78bfa' },
  { id: 'utilities',    label: 'Utilities',     color: '#34d399' },
  { id: 'shopping',     label: 'Shopping',      color: '#f472b6' },
  { id: 'health',       label: 'Health',        color: '#fb7185' },
  { id: 'entertainment',label: 'Entertainment', color: '#c084fc' },
  { id: 'salary',       label: 'Salary',        color: '#22d3ee' },
  { id: 'freelance',    label: 'Freelance',     color: '#84cc16' },
  { id: 'transfer',     label: 'Transfer',      color: '#64748b' },
];

export const transactions: Transaction[] = [
  { id: 't01', date: '2026-05-27', time: '09:14', merchant: 'Bhatbhateni Supermarket', category: 'groceries',     account: 'a1', mode: 'card',   type: 'EXPENSE',  amount: -2840,  note: 'Weekly groceries' },
  { id: 't02', date: '2026-05-26', time: '20:31', merchant: 'Himalayan Java',           category: 'food',          account: 'a2', mode: 'wallet', type: 'EXPENSE',  amount: -480,   note: 'Coffee with Sita' },
  { id: 't03', date: '2026-05-26', time: '12:02', merchant: 'Pathao Ride',              category: 'transport',     account: 'a3', mode: 'wallet', type: 'EXPENSE',  amount: -310,   note: 'Office → Lazimpat' },
  { id: 't04', date: '2026-05-25', time: '18:55', merchant: 'Salary · May',             category: 'salary',        account: 'a1', mode: 'bank',   type: 'INCOME',   amount: 95000,  note: 'Monthly payroll' },
  { id: 't05', date: '2026-05-25', time: '10:10', merchant: 'NEA Electricity',          category: 'utilities',     account: 'a1', mode: 'bank',   type: 'EXPENSE',  amount: -1420,  note: 'Bill · April' },
  { id: 't06', date: '2026-05-24', time: '14:48', merchant: 'Daraz',                    category: 'shopping',      account: 'a4', mode: 'card',   type: 'EXPENSE',  amount: -3699,  note: 'Wireless earbuds' },
  { id: 't07', date: '2026-05-24', time: '09:22', merchant: 'Transfer to Khalti',       category: 'transfer',      account: 'a1', mode: 'bank',   type: 'TRANSFER', amount: -2000,  note: '→ Khalti' },
  { id: 't08', date: '2026-05-23', time: '21:05', merchant: 'CG Cinemas',               category: 'entertainment', account: 'a2', mode: 'wallet', type: 'EXPENSE',  amount: -650,   note: 'Movie · Saturday' },
  { id: 't09', date: '2026-05-23', time: '13:20', merchant: 'Roadhouse Cafe',           category: 'food',          account: 'a4', mode: 'card',   type: 'EXPENSE',  amount: -1820,  note: 'Lunch' },
  { id: 't10', date: '2026-05-22', time: '08:00', merchant: 'Landlord · Rent',          category: 'rent',          account: 'a1', mode: 'bank',   type: 'EXPENSE',  amount: -22000, note: 'Apartment · May' },
  { id: 't11', date: '2026-05-21', time: '11:45', merchant: 'Upwork Payout',            category: 'freelance',     account: 'a1', mode: 'bank',   type: 'INCOME',   amount: 28400,  note: 'Logo project' },
  { id: 't12', date: '2026-05-21', time: '19:30', merchant: 'Saleways',                 category: 'groceries',     account: 'a5', mode: 'cash',   type: 'EXPENSE',  amount: -640,   note: 'Vegetables' },
  { id: 't13', date: '2026-05-20', time: '15:00', merchant: 'Ncell Recharge',           category: 'utilities',     account: 'a3', mode: 'wallet', type: 'EXPENSE',  amount: -500,   note: 'Data pack' },
  { id: 't14', date: '2026-05-20', time: '10:15', merchant: 'Bajeko Sekuwa',            category: 'food',          account: 'a4', mode: 'card',   type: 'EXPENSE',  amount: -1240,  note: 'Team dinner' },
  { id: 't15', date: '2026-05-19', time: '17:22', merchant: 'Norvic Pharmacy',          category: 'health',        account: 'a5', mode: 'cash',   type: 'EXPENSE',  amount: -380,   note: 'Vitamins' },
  { id: 't16', date: '2026-05-18', time: '08:40', merchant: 'Tootle Ride',              category: 'transport',     account: 'a2', mode: 'wallet', type: 'EXPENSE',  amount: -180,   note: 'To office' },
  { id: 't17', date: '2026-05-17', time: '13:30', merchant: 'Bhatbhateni Supermarket',  category: 'groceries',     account: 'a1', mode: 'card',   type: 'EXPENSE',  amount: -3120,  note: 'Weekly groceries' },
  { id: 't18', date: '2026-05-16', time: '21:10', merchant: 'Netflix',                  category: 'entertainment', account: 'a4', mode: 'card',   type: 'EXPENSE',  amount: -549,   note: 'Subscription' },
];

const buildDays = (): SpendDay[] => {
  const days: SpendDay[] = [];
  const today = new Date('2026-05-27');
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const iso = d.toISOString().slice(0, 10);
    const dow = d.getDay();
    const base = 1200 + (dow === 0 || dow === 6 ? 1400 : 0);
    const noise = Math.round(Math.sin(i * 1.7) * 600 + Math.cos(i * 0.6) * 800 + Math.random() * 300);
    days.push({ date: iso, spend: Math.max(120, base + noise) });
  }
  days[days.length - 5].spend = 22000;
  days[days.length - 22].spend = 8400;
  return days;
};

export const spendDays: SpendDay[] = buildDays();

export const categorySpend: CategorySpend[] = [
  { id: 'rent',          label: 'Rent',          amount: 22000, color: '#a78bfa' },
  { id: 'groceries',     label: 'Groceries',     amount: 9840,  color: '#14b8a6' },
  { id: 'food',          label: 'Food & Drink',  amount: 6720,  color: '#f59e0b' },
  { id: 'shopping',      label: 'Shopping',      amount: 5240,  color: '#f472b6' },
  { id: 'transport',     label: 'Transport',     amount: 2180,  color: '#60a5fa' },
  { id: 'utilities',     label: 'Utilities',     amount: 1920,  color: '#34d399' },
  { id: 'entertainment', label: 'Entertainment', amount: 1199,  color: '#c084fc' },
  { id: 'health',        label: 'Health',        amount: 380,   color: '#fb7185' },
];

export const weeklyInsight: Insight = {
  period: 'May 19 – May 25, 2026',
  headline: 'You spent Rs 34,820 this week — 18% less than last week.',
  summary: `Your spending dropped meaningfully this week, driven by fewer restaurant visits and one less grocery run. Food & Drink fell from Rs 4,200 to Rs 2,890, while Transport stayed flat. Rent was your single largest line item at Rs 22,000 — that's 63% of the week and worth keeping in mind when planning discretionary spend.\n\nA few things stood out: your weekday lunches averaged Rs 320, down from Rs 480 last week — likely because you brought lunch from home twice. Your weekend spend (Sat + Sun) was Rs 2,840, mostly across one movie outing and a cafe visit with Sita.\n\nCash flow looks healthy. You earned Rs 28,400 in freelance income mid-week, lifting your runway.`,
  bullets: [
    { icon: 'arrow-down', tone: 'good',    text: 'Food & Drink down Rs 1,310 vs last week' },
    { icon: 'flat',       tone: 'neutral', text: 'Transport flat at Rs 490 this week' },
    { icon: 'alert',      tone: 'warn',    text: 'Daraz purchase of Rs 3,699 — outside your usual shopping pattern' },
    { icon: 'sparkle',    tone: 'good',    text: 'Upwork payout of Rs 28,400 cleared on Wednesday' },
  ],
};

export const monthlyInsight: Insight = {
  period: 'May 2026',
  headline: 'On track to spend Rs 51,200 this month — within your Rs 55,000 budget.',
  summary: `You're 87% through May with Rs 49,499 spent. At your current daily pace, you'll land around Rs 51,200 by month-end — comfortably under your Rs 55,000 self-set ceiling and the first month under-budget in three.\n\nRent (Rs 22,000) and Groceries (Rs 9,840) together account for 64% of the month. That ratio is steady.\n\nTwo patterns worth flagging: Shopping climbed to Rs 5,240 (vs Rs 2,100 average), driven by the Daraz earbuds purchase. Cash flow is positive: Rs 123,400 in (salary + freelance) against Rs 49,499 out.`,
  bullets: [
    { icon: 'sparkle',  tone: 'good',    text: 'First under-budget month since February' },
    { icon: 'arrow-up', tone: 'warn',    text: 'Shopping 2.5x your monthly average' },
    { icon: 'flat',     tone: 'neutral', text: 'Fixed costs (rent + utilities) stable QoQ' },
    { icon: 'sparkle',  tone: 'good',    text: 'Net positive Rs 73,901 — strong runway' },
  ],
};

export const totals = {
  netWorth: accounts.reduce((s, a) => s + a.balance, 0),
  monthIncome: 123400,
  monthSpend: 49499,
  monthBudget: 55000,
};
