import { NavLink, useNavigate } from 'react-router-dom';
import * as Icons from '../icons';
import { user } from '../../lib/sampleData';

export default function Sidebar() {
  const navigate = useNavigate();

  const items = [
    { to: '/',             label: 'Dashboard',        Icon: Icons.Home },
    { to: '/transactions', label: 'Transactions',     Icon: Icons.List },
    { to: '/add',          label: 'Add transaction',  Icon: Icons.Plus },
    { to: '/ai',           label: 'AI input',         Icon: Icons.Stars, badge: 'AI' },
  ];
  const insights = [
    { to: '/insights/weekly',  label: 'Weekly insights',  Icon: Icons.Calendar },
    { to: '/insights/monthly', label: 'Monthly insights', Icon: Icons.CalendarMonth },
  ];

  const handleLogout = () => navigate('/login');

  return (
    <nav className="sb">
      <div className="sb-brand">
        <div className="sb-logo">AI</div>
        <div className="sb-name">AI Expense Tracker</div>
      </div>

      <div className="sb-section-label">Workspace</div>
      {items.map(({ to, label, Icon, badge }) => (
        <NavLink key={to} to={to} end={to === '/'}
          className={({ isActive }) => `sb-item${isActive ? ' active' : ''}`}>
          <Icon size={15} className="sb-ico" />
          <span>{label}</span>
          {badge && <span className="sb-badge">{badge}</span>}
        </NavLink>
      ))}

      <div className="sb-section-label">Insights</div>
      {insights.map(({ to, label, Icon }) => (
        <NavLink key={to} to={to}
          className={({ isActive }) => `sb-item${isActive ? ' active' : ''}`}>
          <Icon size={15} className="sb-ico" />
          <span>{label}</span>
        </NavLink>
      ))}

      <div className="sb-section-label">Account</div>
      <a className="sb-item" href="#"><Icons.Settings size={15} className="sb-ico" /><span>Settings</span></a>
      <a className="sb-item" href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }}>
        <Icons.Logout size={15} className="sb-ico" /><span>Log out</span>
      </a>

      <div className="sb-user">
        <div className="sb-user-av">{user.initials}</div>
        <div className="sb-user-meta">
          <div className="sb-user-name">{user.name}</div>
          <div className="sb-user-email">{user.email}</div>
        </div>
      </div>
    </nav>
  );
}
