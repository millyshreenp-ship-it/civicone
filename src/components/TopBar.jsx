import { Icons } from './Icons'

export default function TopBar({ colony, userName }) {
  return (
    <div className="top-bar">
      <div className="colony-badge">
        <Icons.MapPin />
        Your colony: {colony}
      </div>
      <div className="user-profile-btn" title={userName}>
        {userName.charAt(0).toUpperCase()}
      </div>
    </div>
  )
}
