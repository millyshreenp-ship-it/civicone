import { useState } from 'react'
import { DELHI_COLONIES } from '../data/mockData'

export default function AuthScreen({ onAuth }) {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    colony: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.name && formData.contact && formData.colony) {
      onAuth(formData)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">CivicOne</div>
        <div className="auth-tagline">One colony. One platform. Real solutions.</div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-input"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Phone or Email</label>
            <input
              type="text"
              className="form-input"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              placeholder="Contact information"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Select Your Colony</label>
            <select
              className="form-select"
              value={formData.colony}
              onChange={(e) => setFormData({ ...formData, colony: e.target.value })}
              required
            >
              <option value="">Choose your colony...</option>
              {DELHI_COLONIES.map((colony) => (
                <option key={colony} value={colony}>
                  {colony}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            Continue to CivicOne
          </button>
        </form>
      </div>
    </div>
  )
}
