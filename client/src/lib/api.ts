import axios from 'axios';
import type { Transaction, TransactionType } from '../types';

const http = axios.create({ baseURL: '/api' });

// ── Token management ────────────────────────────────────────────────────────

export function setToken(token: string | null) {
  if (token) {
    http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token);
  } else {
    delete http.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
}

// Restore from storage on import
const stored = localStorage.getItem('token');
if (stored) setToken(stored);

// Auto-clear on 401
http.interceptors.response.use(
  r => r,
  err => {
    if (err.response?.status === 401) {
      setToken(null);
      window.location.href = '/login';
    }
    return Promise.reject(err);
  },
);

// ── Auth ────────────────────────────────────────────────────────────────────

export const login = (email: string, password: string) =>
  http.post<AuthResponse>('/auth/login', { email, password });

export const register = (name: string, email: string, password: string) =>
  http.post<AuthResponse>('/auth/register', { name, email, password });

// ── Transactions ─────────────────────────────────────────────────────────────

export const fetchTransactions = () => http.get<ApiTransaction[]>('/transactions');

export const createTransaction = (body: TransactionRequest) =>
  http.post<ApiTransaction>('/transactions', body);

export const deleteTransaction = (id: string) => http.delete(`/transactions/${id}`);

// ── Reference data ────────────────────────────────────────────────────────────

export const fetchAccounts    = () => http.get<ApiAccount[]>('/accounts');
export const fetchCategories  = () => http.get<ApiCategory[]>('/categories');
export const fetchPaymentModes = () => http.get<ApiPaymentMode[]>('/payment-modes');

// ── AI ────────────────────────────────────────────────────────────────────────

export const aiParseSync = (rawText: string) =>
  http.post<TransactionRequest>('/ai-input/sync', { rawText });

// ── Insights ──────────────────────────────────────────────────────────────────

export const fetchLatestInsight = (type: 'WEEKLY' | 'MONTHLY') =>
  http.get<ApiInsight>(`/insights/latest?type=${type}`);

// ── API types ─────────────────────────────────────────────────────────────────

export interface AuthResponse {
  accessToken: string;
  tokenType: string;
  expiresInSeconds: number;
}

export interface ApiTransaction {
  transactionId: string;
  type: string;
  description: string | null;
  amount: number;
  transactionDate: string;
  transferId: string | null;
  categoryName: string | null;
  accountName: string | null;
  paymentModeName: string | null;
  createdAt: number;
}

export interface ApiAccount {
  id: number;
  name: string;
  balance: number;
  lastFourDigits: string | null;
}

export interface ApiCategory {
  id: number;
  name: string;
}

export interface ApiPaymentMode {
  id: number;
  name: string;
  type: string | null;
}

export interface TransactionRequest {
  transactionId?: number | null;
  type: string;
  description: string | null;
  amount: number;
  transactionDate: string;
  paymentModeId: number;
  accountId: number;
  categoryId: number;
  toAccountId?: number | null;
  transferId?: string | null;
}

export interface ApiInsight {
  id: number;
  type: string;
  insightText: string;
  status: string;
  createdAt: number;
}

// ── Transform backend → frontend ─────────────────────────────────────────────

export function toFrontendTx(dto: ApiTransaction): Transaction {
  return {
    id: dto.transactionId,
    type: dto.type as TransactionType,
    merchant: dto.description ?? '',
    amount: dto.amount,
    date: dto.transactionDate,
    time: dto.createdAt
      ? new Date(dto.createdAt).toTimeString().slice(0, 5)
      : '00:00',
    category: dto.categoryName ?? '',
    account: dto.accountName ?? '',
    mode: dto.paymentModeName ?? '',
  };
}
