import { useState } from 'react'
import { CATEGORIES } from '../data/mockData'
import { Icons } from '../components/Icons'

export default function ReportPage({ colony, onSubmit, preselectedCategory }) {
  const [formData, setFormData] = useState({
    category: preselectedCategory || '',
    description: '',
    image: null,
    imagePreview: null,
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [newIssueId, setNewIssueId] = useState(null)

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: file,
          imagePreview: reader.result,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      const issueId = 1000 + Math.floor(Math.random() * 9000)
      const newIssue = {
        id: issueId,
        colony: colony,
        category: formData.category,
        street: 'Auto-detected Location (mock)',
        description: formData.description,
        image:
          formData.imagePreview ||
          'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
        status: 'Reported',
        distance: '0 km',
        aiCheck: formData.image ? 'Likely Match' : 'Unclear',
        verificationCount: 0,
        reporter: 'You',
        createdAt: new Date(),
        timeline: [{ step: 'Reported', timestamp: new Date(), actor: 'You' }],
      }

      setNewIssueId(issueId)
      setSubmitted(true)
      setLoading(false)
      onSubmit(newIssue)
    }, 1500)
  }

  if (submitted) {
    return (
      <div style={{ maxWidth: '600px', margin: '64px auto', textAlign: 'center' }}>
        <div className="card" style={{ padding: '48px' }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>✅</div>
          <h2
            style={{
              fontSize: '24px',
              fontWeight: '700',
              marginBottom: '8px',
              color: 'var(--civic-blue-dark)',
            }}
          >
            Issue Reported Successfully
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
            Issue ID: #{newIssueId}
          </p>
          <div className="status-badge status-reported" style={{ marginBottom: '24px' }}>
            Status: Reported
          </div>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '32px' }}>
            Your issue is now visible to the community for verification.
          </p>
          <button className="btn btn-primary" onClick={() => window.location.reload()}>
            View Issue Details
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">New Issue in {colony}</h1>
        <p className="page-subtitle">Report a civic issue for community verification</p>
      </div>

      <div className="card" style={{ maxWidth: '700px' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Upload Photo</label>
            <div
              className="image-upload"
              onClick={() => document.getElementById('file-input').click()}
            >
              <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
              {!formData.imagePreview ? (
                <>
                  <Icons.Upload />
                  <p style={{ marginTop: '16px', color: 'var(--text-muted)' }}>
                    Click to upload an image of the issue
                  </p>
                </>
              ) : (
                <img src={formData.imagePreview} alt="Preview" className="image-preview" />
              )}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Auto-Location</label>
            <div
              style={{
                padding: '12px 16px',
                background: 'var(--bg)',
                borderRadius: '8px',
                fontSize: '14px',
              }}
            >
              <div>
                <strong>Colony:</strong> {colony}
              </div>
              <div style={{ marginTop: '4px' }}>
                <strong>Street:</strong> Auto-detected (mock)
              </div>
              <div style={{ marginTop: '4px', fontSize: '12px', color: 'var(--text-muted)' }}>
                Using browser geolocation
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
            >
              <option value="">Select category...</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-textarea"
              value={formData.description}
              onChange={(e) => {
                if (e.target.value.length <= 200) {
                  setFormData({ ...formData, description: e.target.value })
                }
              }}
              placeholder="Describe the issue..."
              required
            />
            <div className="char-counter">{formData.description.length}/200</div>
          </div>

          <div className="form-group">
            <label className="form-label">AI Image Check</label>
            <div
              style={{
                padding: '12px 16px',
                background: 'var(--bg)',
                borderRadius: '8px',
              }}
            >
              <div style={{ fontWeight: '500', marginBottom: '4px' }}>
                Result:{' '}
                <span className={formData.image ? 'ai-check-match' : 'ai-check-unclear'}>
                  {formData.image ? 'Likely Match' : 'Unclear'}
                </span>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Automated preliminary check (mock)
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%' }}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading-spinner"></span>
                <span>Submitting...</span>
              </>
            ) : (
              'Submit Issue'
            )}
          </button>
        </form>
      </div>
    </>
  )
}
