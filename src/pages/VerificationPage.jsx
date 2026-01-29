import { useState } from 'react'

export default function VerificationPage({ issues, onVerify }) {
  const [votedIssues, setVotedIssues] = useState(new Set())

  const handleVote = (issueId, isValid) => {
    if (votedIssues.has(issueId)) {
      alert('You have already voted on this issue')
      return
    }
    onVerify(issueId, isValid)
    setVotedIssues(new Set([...votedIssues, issueId]))
  }

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Issues Near You</h1>
        <p className="page-subtitle">
          Help verify issues reported in your colony. Your vote strengthens community accountability.
        </p>
      </div>

      {issues.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '48px' }}>
          <p style={{ color: 'var(--text-muted)' }}>No issues pending verification</p>
        </div>
      ) : (
        issues.map((issue) => (
          <div key={issue.id} className="card verification-card">
            <img
              src={issue.image}
              alt={issue.category}
              className="issue-thumbnail"
              style={{ width: '160px', height: '160px' }}
            />

            <div>
              <div className="issue-header" style={{ marginBottom: '8px' }}>
                <span
                  className={`category-chip chip-${issue.category.toLowerCase().replace(' ', '')}`}
                >
                  {issue.category}
                </span>
              </div>

              <div className="street-name">{issue.street}</div>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>
                {issue.description}
              </p>

              <div style={{ marginTop: '12px', fontSize: '14px', color: 'var(--text-muted)' }}>
                📍 {issue.distance} away • ✓ {issue.verificationCount} verified
              </div>

              <div className="ai-check" style={{ marginTop: '8px' }}>
                AI Image Check:{' '}
                <span
                  className={
                    issue.aiCheck === 'Likely Match' ? 'ai-check-match' : 'ai-check-unclear'
                  }
                >
                  {issue.aiCheck}
                </span>
              </div>
            </div>

            <div className="verification-actions">
              <button
                className="btn btn-success btn-sm"
                onClick={() => handleVote(issue.id, true)}
                disabled={votedIssues.has(issue.id)}
              >
                Yes, this exists
              </button>
              <button
                className="btn btn-warning btn-sm"
                onClick={() => handleVote(issue.id, false)}
                disabled={votedIssues.has(issue.id)}
              >
                No, not valid
              </button>
            </div>
          </div>
        ))
      )}
    </>
  )
}
