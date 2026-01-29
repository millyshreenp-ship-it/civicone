import { useState } from 'react'
import { CATEGORIES } from '../data/mockData'
import { Icons } from '../components/Icons'

function IssueCard({ issue }) {
  return (
    <div className="card issue-card">
      <img src={issue.image} alt={issue.category} className="issue-thumbnail" />

      <div className="issue-content">
        <div className="issue-header">
          <span className={`category-chip chip-${issue.category.toLowerCase().replace(' ', '')}`}>
            {issue.category}
          </span>
          <span className={`status-badge status-${issue.status.toLowerCase().replace(' ', '')}`}>
            {issue.status}
          </span>
        </div>

        <div className="street-name">{issue.street}</div>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>{issue.description}</p>

        <div className="issue-meta">
          <span>📍 {issue.distance} away</span>
          <span>✓ {issue.verificationCount} verified</span>
        </div>

        <div className="ai-check">
          AI Image Check:{' '}
          <span
            className={issue.aiCheck === 'Likely Match' ? 'ai-check-match' : 'ai-check-unclear'}
          >
            {issue.aiCheck}
          </span>{' '}
          <span style={{ fontSize: '11px' }}>(mock)</span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button className="btn btn-outline btn-sm">View Details</button>
      </div>
    </div>
  )
}

function MapView({ issues }) {
  return (
    <div className="map-container">
      <div className="map-placeholder">
        <div style={{ position: 'relative', width: '100%', height: '100%', background: '#E5E7EB' }}>
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
            }}
          >
            <Icons.MapPin />
            <p style={{ marginTop: '8px' }}>Map View (Mocked)</p>
            <p style={{ fontSize: '13px', marginTop: '4px' }}>Showing {issues.length} issues</p>
          </div>
          {issues.slice(0, 5).map((issue, idx) => (
            <div
              key={issue.id}
              className="map-marker"
              style={{
                left: `${20 + idx * 15}%`,
                top: `${30 + idx * 10}%`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="map-issues-list">
        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>Nearby Issues</h3>
        {issues.slice(0, 8).map((issue) => (
          <div
            key={issue.id}
            style={{
              marginBottom: '12px',
              paddingBottom: '12px',
              borderBottom: '1px solid var(--border)',
            }}
          >
            <div style={{ display: 'flex', gap: '8px', alignItems: 'start' }}>
              <img
                src={issue.image}
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '6px',
                  objectFit: 'cover',
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '2px' }}>
                  {issue.street}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  {issue.category} • {issue.distance}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function FeedPage({ issues, colony }) {
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [viewMode, setViewMode] = useState('list')

  const filteredIssues =
    categoryFilter === 'All' ? issues : issues.filter((i) => i.category === categoryFilter)

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Issues in Your Colony</h1>
        <p className="page-subtitle">Track and monitor civic issues reported in {colony}</p>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
        }}
      >
        <div className="filter-pills">
          <button
            className={`filter-pill ${categoryFilter === 'All' ? 'active' : ''}`}
            onClick={() => setCategoryFilter('All')}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`filter-pill ${categoryFilter === cat ? 'active' : ''}`}
              onClick={() => setCategoryFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="view-toggle">
          <button
            className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            List
          </button>
          <button
            className={`view-toggle-btn ${viewMode === 'map' ? 'active' : ''}`}
            onClick={() => setViewMode('map')}
          >
            Map
          </button>
        </div>
      </div>

      {viewMode === 'list' ? (
        <div>
          {filteredIssues.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '48px' }}>
              <p style={{ color: 'var(--text-muted)' }}>No issues found in this category</p>
            </div>
          ) : (
            filteredIssues.map((issue) => <IssueCard key={issue.id} issue={issue} />)
          )}
        </div>
      ) : (
        <MapView issues={filteredIssues} />
      )}
    </>
  )
}
