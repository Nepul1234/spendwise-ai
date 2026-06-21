export type TransactionType = 'EXPENSE' | 'INCOME' | 'TRANSFER';

export interface Transaction {
  id: string;
  date: string;
  time: string;
  merchant: string;
  category: string;
  account: string;
  mode: string;
  type: TransactionType;
  amount: number;
  note?: string;
}

export interface Account {
  id: string;
  name: string;
  type: 'bank' | 'wallet' | 'card' | 'cash';
  balance: number;
  last4: string;
  color: string;
}

export interface Category {
  id: string;
  label: string;
  color: string;
}

export interface SpendDay {
  date: string;
  spend: number;
}

export interface CategorySpend {
  id: string;
  label: string;
  amount: number;
  color: string;
}

export interface InsightBullet {
  icon: string;
  tone: 'good' | 'warn' | 'neutral';
  text: string;
}

export interface Insight {
  period: string;
  headline: string;
  summary: string;
  bullets: InsightBullet[];
}

export interface Toast {
  id: number;
  kind?: 'success' | 'error' | 'ai';
  aiTone?: boolean;
  title: string;
  msg?: string;
  duration?: number;
}

export interface User {
  name: string;
  email: string;
  initials: string;
}
