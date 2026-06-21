import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import ToastHost from './components/ui/Toast';
import { useToasts } from './hooks/useToasts';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import AddTransaction from './pages/AddTransaction';
import AIInput from './pages/AIInput';
import Insights from './pages/Insights';
import * as api from './lib/api';
import type { Transaction } from './types';

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function AppShell() {
  return (
    <div className="app nums-mono">
      <Sidebar />
      <div className="main">
        <Outlet />
      </div>
    </div>
  );
}

function AppRoutes() {
  const { toasts, push, close } = useToasts();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [tx, setTx] = useState<Transaction[]>([]);

  useEffect(() => {
    if (!token) return;
    api.fetchTransactions()
      .then(r => setTx(r.data.map(api.toFrontendTx)))
      .catch(() => {});
  }, [token]);

  const reload = () =>
    api.fetchTransactions().then(r => setTx(r.data.map(api.toFrontendTx))).catch(() => {});

  const handleSaveRequest = async (req: api.TransactionRequest) => {
    try {
      const res = await api.createTransaction(req);
      await reload();
      push({ kind: 'success', title: 'Transaction saved', msg: `${res.data.description ?? ''} · Rs ${Math.abs(res.data.amount ?? 0).toLocaleString('en-IN')}` });
      navigate('/transactions');
    } catch {
      push({ kind: 'error', title: 'Save failed', msg: 'Could not save transaction.' });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.deleteTransaction(id);
      setTx(arr => arr.filter(t => t.id !== id));
      push({ kind: 'success', title: 'Transaction deleted' });
    } catch {
      push({ kind: 'error', title: 'Delete failed' });
    }
  };

  return (
    <>
      <Routes>
        <Route path="/login"    element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<RequireAuth><AppShell /></RequireAuth>}>
          <Route path="/"               element={<Dashboard push={push} tx={tx} />} />
          <Route path="/transactions"   element={<Transactions tx={tx} onDelete={handleDelete} push={push} />} />
          <Route path="/add"            element={<AddTransaction onSaveRequest={handleSaveRequest} push={push} />} />
          <Route path="/ai"             element={<AIInput onSaveRequest={handleSaveRequest} push={push} />} />
          <Route path="/insights/:kind" element={<Insights />} />
          <Route path="/insights"       element={<Navigate to="/insights/weekly" replace />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <ToastHost toasts={toasts} onClose={close} />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
