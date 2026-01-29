import { Icons } from './Icons'

export default function Sidebar({ activePage, setActivePage, isAdmin, setIsAdmin, unreadCount }) {
  const navItems = [
    { id: 'feed', label: 'My Colony Feed', icon: Icons.Home },
    { id: 'report', label: 'Report Issue', icon: Icons.Report },
    { id: 'verify', label: 'Community Verification', icon: Icons.Verify },
    { id: 'notifications', label: 'Notifications', icon: Icons.Bell, badge: unreadCount },
    { id: 'leaderboard', label: 'Colony Leaderboard', icon: Icons.Trophy },
    ...(isAdmin ? [{ id: 'admin', label: 'Admin Dashboard', icon: Icons.Dashboard }] : []),
    { id: 'profile', label: 'Profile', icon: Icons.User },
  ]

  return (
    <div className="sidebar">
      <div className="logo-section">
        <div className="app-logo">CivicOne</div>
        <div className="app-tagline">One colony. One platform. Real solutions.</div>
      </div>

      <ul className="nav-items">
        {navItems.map((item) => (
          <li key={item.id} className="nav-item">
            <div
              className={`nav-link ${activePage === item.id ? 'active' : ''}`}
              onClick={() => setActivePage(item.id)}
            >
              <item.icon />
              <span>{item.label}</span>
              {item.badge > 0 && <span className="notification-badge">{item.badge}</span>}
            </div>
          </li>
        ))}
      </ul>

      <div
        style={{
          marginTop: 'auto',
          paddingTop: '24px',
          borderTop: '1px solid rgba(255,255,255,0.2)',
        }}
      >
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
          <span>Admin Mode</span>
        </label>
      </div>
    </div>
  )
}
