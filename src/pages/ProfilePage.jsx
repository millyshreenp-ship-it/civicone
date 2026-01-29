import { Icons } from '../components/Icons'

export default function ProfilePage({ user }) {
  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Your Profile</h1>
        <p className="page-subtitle">Track your civic contributions</p>
      </div>

      <div className="card">
        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '32px', alignItems: 'start' }}>
          <div
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'var(--civic-blue)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '48px',
              fontWeight: '700',
            }}
          >
            {user.name.charAt(0).toUpperCase()}
          </div>

          <div>
            <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>{user.name}</h2>
            <div style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>
              <Icons.MapPin /> {user.colony}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginTop: '24px' }}>
              <div>
                <div style={{ fontSize: '36px', fontWeight: '700', color: 'var(--civic-blue)' }}>
                  {user.civicScore}
                </div>
                <div style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: '500' }}>
                  Civic Score
                </div>
              </div>

              <div>
                <span
                  className={`level-badge level-${user.level.toLowerCase()}`}
                  style={{ padding: '8px 16px', fontSize: '14px' }}
                >
                  {user.level} Civic Champion
                </span>
              </div>
            </div>

            {user.badges && user.badges.length > 0 && (
              <div style={{ marginTop: '24px' }}>
                <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>
                  Earned Badges
                </div>
                <div className="profile-badges">
                  {user.badges.map((badge) => (
                    <div key={badge} className="profile-badge">
                      <Icons.Trophy />
                      {badge}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: '24px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>
          How Civic Score Works
        </h3>
        <ul style={{ lineHeight: '1.8', color: 'var(--text-muted)' }}>
          <li>+points when your reported issue reaches Verified status</li>
          <li>+points for voting on issues that become Verified</li>
          <li>−20 points penalty when an issue is marked as Fake (Strike)</li>
          <li>Earn special badges for consistent civic engagement</li>
        </ul>
      </div>
    </>
  )
}
