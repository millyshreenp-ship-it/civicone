import { useState } from 'react'
import AuthScreen from './components/AuthScreen'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import FeedPage from './pages/FeedPage'
import ReportPage from './pages/ReportPage'
import VerificationPage from './pages/VerificationPage'
import NotificationsPage from './pages/NotificationsPage'
import LeaderboardPage from './pages/LeaderboardPage'
import AdminDashboard from './pages/AdminDashboard'
import ProfilePage from './pages/ProfilePage'
import QuickReportModal from './components/QuickReportModal'
import { INITIAL_ISSUES, INITIAL_USERS } from './data/mockData'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [activePage, setActivePage] = useState('feed')
  const [issues, setIssues] = useState(INITIAL_ISSUES)
  const [users, setUsers] = useState(INITIAL_USERS)
  const [notifications, setNotifications] = useState([])
  const [showReportModal, setShowReportModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)

  if (!isAuthenticated) {
    return (
      <AuthScreen
        onAuth={(user) => {
          setIsAuthenticated(true)
          setCurrentUser(user)
          if (!users.find((u) => u.name === user.name)) {
            setUsers([
              ...users,
              {
                id: users.length + 1,
                name: user.name,
                colony: user.colony,
                civicScore: 0,
                level: 'Bronze',
                badges: [],
              },
            ])
          }
        }}
      />
    )
  }

  const userColonyIssues = issues.filter(
    (issue) => issue.colony === currentUser.colony
  )
  const currentUserProfile =
    users.find((u) => u.name === currentUser.name) || {
      ...currentUser,
      civicScore: 0,
      level: 'Bronze',
      badges: [],
    }

  const addNotification = (message, issueId) => {
    setNotifications([
      {
        id: Date.now(),
        message,
        issueId,
        read: false,
        timestamp: new Date(),
      },
      ...notifications,
    ])
  }

  return (
    <div className="app-container">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
        unreadCount={notifications.filter((n) => !n.read).length}
      />
      <div className="main-content">
        <div className="tricolor-strip"></div>
        <TopBar colony={currentUser.colony} userName={currentUser.name} />
        <div className="content-area">
          {activePage === 'feed' && (
            <FeedPage
              issues={userColonyIssues}
              setIssues={setIssues}
              colony={currentUser.colony}
            />
          )}
          {activePage === 'report' && (
            <ReportPage
              colony={currentUser.colony}
              onSubmit={(newIssue) => {
                setIssues([newIssue, ...issues])
                addNotification(
                  'Your issue has been reported successfully',
                  newIssue.id
                )
                setActivePage('feed')
              }}
              preselectedCategory={selectedCategory}
            />
          )}
          {activePage === 'verify' && (
            <VerificationPage
              issues={userColonyIssues.filter(
                (i) => i.status === 'Reported' || i.status === 'Verified'
              )}
              onVerify={(issueId, isValid) => {
                setIssues(
                  issues.map((issue) => {
                    if (issue.id === issueId) {
                      const newCount =
                        issue.verificationCount + (isValid ? 1 : -1)
                      const newStatus =
                        newCount >= 3 && isValid ? 'Verified' : issue.status
                      const newTimeline =
                        newStatus === 'Verified' && issue.status !== 'Verified'
                          ? [
                              ...issue.timeline,
                              {
                                step: 'Verified',
                                timestamp: new Date(),
                                actor: `Verified by ${newCount} residents`,
                              },
                            ]
                          : issue.timeline

                      if (newStatus === 'Verified' && issue.status !== 'Verified') {
                        addNotification(
                          `Issue #${issueId} is now verified by the community`,
                          issueId
                        )
                      }

                      return {
                        ...issue,
                        verificationCount: newCount,
                        status: newStatus,
                        timeline: newTimeline,
                      }
                    }
                    return issue
                  })
                )
              }}
              currentUser={currentUserProfile}
            />
          )}
          {activePage === 'notifications' && (
            <NotificationsPage
              notifications={notifications}
              onMarkRead={(id) => {
                setNotifications(
                  notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
                )
              }}
              onViewIssue={(issueId) => {
                alert(`Viewing issue #${issueId}`)
              }}
            />
          )}
          {activePage === 'leaderboard' && (
            <LeaderboardPage
              users={users.filter((u) => u.colony === currentUser.colony)}
              currentUser={currentUserProfile}
            />
          )}
          {activePage === 'admin' && isAdmin && (
            <AdminDashboard
              issues={issues}
              setIssues={setIssues}
              addNotification={addNotification}
            />
          )}
          {activePage === 'profile' && <ProfilePage user={currentUserProfile} />}
        </div>
      </div>

      {(activePage === 'feed' || activePage === 'verify') && (
        <button
          className="fab"
          onClick={() => setShowReportModal(true)}
          title="Report Issue"
        >
          +
        </button>
      )}

      {showReportModal && (
        <QuickReportModal
          onClose={() => setShowReportModal(false)}
          onSelectCategory={(category) => {
            setSelectedCategory(category)
            setActivePage('report')
            setShowReportModal(false)
          }}
        />
      )}
    </div>
  )
}

export default App
