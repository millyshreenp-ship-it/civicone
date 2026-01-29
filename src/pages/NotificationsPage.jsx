export default function NotificationsPage({ notifications, onMarkRead, onViewIssue }) {
  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Notifications</h1>
        <p className="page-subtitle">Stay updated on your reported issues</p>
      </div>

      {notifications.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '48px' }}>
          <p style={{ color: 'var(--text-muted)' }}>No notifications yet</p>
        </div>
      ) : (
        <div>
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`notification-item ${!notif.read ? 'unread' : ''}`}
              onClick={() => {
                onMarkRead(notif.id)
                onViewIssue(notif.issueId)
              }}
              style={{ cursor: 'pointer' }}
            >
              <div className="notification-title">{notif.message}</div>
              <div className="notification-meta">
                Issue #{notif.issueId} • {notif.timestamp.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
