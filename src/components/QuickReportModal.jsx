import { CATEGORIES } from '../data/mockData'

export default function QuickReportModal({ onClose, onSelectCategory }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Report an Issue</h2>
        </div>

        <div className="modal-body">
          <p style={{ marginBottom: '16px', color: 'var(--text-muted)' }}>
            Select the type of issue to report quickly
          </p>

          <div className="quick-chips">
            {CATEGORIES.map((category) => (
              <div
                key={category}
                className="quick-chip"
                onClick={() => onSelectCategory(category)}
              >
                {category}
              </div>
            ))}
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-outline" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
