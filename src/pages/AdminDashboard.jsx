import { useState } from 'react'
import { DELHI_COLONIES } from '../data/mockData'

export default function AdminDashboard({ issues, setIssues, addNotification }) {
  const [colonyFilter, setColonyFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')

  const filteredIssues = issues.filter((issue) => {
    if (colonyFilter !== 'All' && issue.colony !== colonyFilter) return false
    if (statusFilter !== 'All' && issue.status !== statusFilter) return false
    return true
  })

  const stats = {
    total: issues.length,
    verified: issues.filter((i) => i.status === 'Verified').length,
    resolved: issues.filter((i) => i.status === 'Resolved').length,
    fake: issues.filter((i) => i.status === 'Marked Fake').length,
  }

  const updateIssueStatus = (issueId, newStatus) => {
    setIssues(
      issues.map((issue) => {
        if (issue.id === issueId) {
          const statusMap = {
            Assigned: 'Assigned',
            Resolved: 'Resolved',
            'Marked Fake': 'Marked Fake',
          }

          const newTimeline = [
            ...issue.timeline,
            {
              step: statusMap[newStatus],
              timestamp: new Date(),
              actor: newStatus === 'Marked Fake' ? 'Admin Review' : 'Municipal Authority',
            },
          ]

          addNotification(`Issue #${issueId} status updated to ${newStatus}`, issueId)

          return {
            ...issue,
            status: newStatus,
            timeline: newTimeline,
          }
        }
        return issue
      })
    )
  }

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Admin Dashboard</h1>
        <p className="page-subtitle">Manage and track all civic issues across colonies</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card stat-total">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total Issues</div>
        </div>
        <div className="stat-card stat-verified">
          <div className="stat-value">{stats.verified}</div>
          <div className="stat-label">Verified Issues</div>
        </div>
        <div className="stat-card stat-resolved">
          <div className="stat-value">{stats.resolved}</div>
          <div className="stat-label">Resolved Issues</div>
        </div>
        <div className="stat-card stat-fake">
          <div className="stat-value">{stats.fake}</div>
          <div className="stat-label">Marked Fake</div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
            <label className="form-label">Filter by Colony</label>
            <select
              className="form-select"
              value={colonyFilter}
              onChange={(e) => setColonyFilter(e.target.value)}
            >
              <option value="All">All Colonies</option>
              {DELHI_COLONIES.map((colony) => (
                <option key={colony} value={colony}>
                  {colony}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
            <label className="form-label">Filter by Status</label>
            <select
              className="form-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Reported">Reported</option>
              <option value="Verified">Verified</option>
              <option value="Assigned">Assigned</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Marked Fake">Marked Fake</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'auto' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Colony</th>
              <th>Category</th>
              <th>Street</th>
              <th>Status</th>
              <th>Verifications</th>
              <th>AI Check</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredIssues.map((issue) => (
              <tr key={issue.id}>
                <td style={{ fontWeight: '600' }}>#{issue.id}</td>
                <td>{issue.colony}</td>
                <td>
                  <span
                    className={`category-chip chip-${issue.category.toLowerCase().replace(' ', '')}`}
                  >
                    {issue.category}
                  </span>
                </td>
                <td>{issue.street}</td>
                <td>
                  <span
                    className={`status-badge status-${issue.status.toLowerCase().replace(' ', '')}`}
                  >
                    {issue.status}
                  </span>
                </td>
                <td>{issue.verificationCount}</td>
                <td>
                  <span
                    style={{
                      fontSize: '13px',
                      color: issue.aiCheck === 'Likely Match' ? 'var(--success)' : 'var(--warning)',
                    }}
                  >
                    {issue.aiCheck}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {issue.status === 'Verified' && (
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => updateIssueStatus(issue.id, 'Assigned')}
                      >
                        Assign
                      </button>
                    )}
                    {(issue.status === 'Assigned' || issue.status === 'In Progress') && (
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => updateIssueStatus(issue.id, 'Resolved')}
                      >
                        Resolve
                      </button>
                    )}
                    {issue.status !== 'Marked Fake' && issue.status !== 'Resolved' && (
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => updateIssueStatus(issue.id, 'Marked Fake')}
                      >
                        Mark Fake
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
