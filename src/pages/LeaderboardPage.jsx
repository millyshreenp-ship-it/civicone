import { useState } from 'react'

export default function LeaderboardPage({ users, currentUser }) {
  const [activeTab, setActiveTab] = useState('month')

  const sortedUsers = [...users].sort((a, b) => b.civicScore - a.civicScore).slice(0, 10)

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Civic Champions in {currentUser.colony}</h1>
        <p className="page-subtitle">Top contributors making a difference</p>
      </div>

      <div className="leaderboard-tabs">
        <div
          className={`leaderboard-tab ${activeTab === 'month' ? 'active' : ''}`}
          onClick={() => setActiveTab('month')}
        >
          This Month
        </div>
        <div
          className={`leaderboard-tab ${activeTab === 'alltime' ? 'active' : ''}`}
          onClick={() => setActiveTab('alltime')}
        >
          All Time
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Civic Score</th>
              <th>Level</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user, index) => (
              <tr
                key={user.id}
                style={{ background: user.id === currentUser.id ? '#EFF6FF' : 'transparent' }}
              >
                <td style={{ fontWeight: '700', fontSize: '18px' }}>#{index + 1}</td>
                <td>
                  <div style={{ fontWeight: '600' }}>{user.name}</div>
                  {user.id === currentUser.id && (
                    <div style={{ fontSize: '12px', color: 'var(--civic-blue)', fontWeight: '600' }}>
                      You
                    </div>
                  )}
                </td>
                <td style={{ fontWeight: '700', fontSize: '16px' }}>{user.civicScore}</td>
                <td>
                  <span className={`level-badge level-${user.level.toLowerCase()}`}>
                    {user.level} Champion
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
