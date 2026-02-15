# CivicOne - Design Document

## System Architecture

### High-Level Architecture

```
┌─────────────────┐
│   React Client  │
│   (Frontend)    │
└────────┬────────┘
         │ HTTPS/REST API
         │
┌────────▼────────┐
│   Node.js API   │
│   (Backend)     │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
┌───▼───┐ ┌──▼──────┐
│MongoDB│ │ Google  │
│       │ │ Maps API│
└───────┘ └─────────┘
```

### Architecture Pattern
- **Client-Server Architecture** with RESTful API
- **MVC Pattern** on backend
- **Component-Based Architecture** on frontend

## Technology Stack Details

### Frontend
- **Framework:** React 18+
- **State Management:** React Context API / Redux
- **Routing:** React Router v6
- **UI Components:** Material-UI or Tailwind CSS
- **Maps:** react-google-maps or @react-google-maps/api
- **HTTP Client:** Axios
- **Form Handling:** React Hook Form
- **Image Upload:** react-dropzone

### Backend
- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcrypt
- **Validation:** express-validator or Joi
- **File Upload:** Multer
- **Image Processing:** Sharp
- **Environment Variables:** dotenv

### Database
- **Database:** MongoDB 6+
- **ODM:** Mongoose
- **Indexing:** Geospatial indexes for location queries

### External Services
- **Maps:** Google Maps JavaScript API
- **Geocoding:** Google Geocoding API
- **Image Storage:** AWS S3 or Cloudinary
- **Email:** SendGrid or Nodemailer

## Database Design

### Collections Schema

#### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique, indexed),
  password: String (hashed),
  role: String (enum: ['citizen', 'authority', 'volunteer']),
  phone: String,
  avatar: String (URL),
  department: String (for authorities),
  jurisdiction: {
    type: String,
    coordinates: [Number] (for authorities)
  },
  createdAt: Date,
  updatedAt: Date,
  stats: {
    issuesReported: Number,
    issuesResolved: Number
  }
}
```

#### Issues Collection
```javascript
{
  _id: ObjectId,
  title: String (indexed),
  description: String,
  category: String (enum: ['garbage', 'pothole', 'streetlight', 'water', 'road', 'other']),
  status: String (enum: ['reported', 'verified', 'in_progress', 'resolved', 'closed']),
  severity: String (enum: ['low', 'medium', 'high']),
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number, Number], // [longitude, latitude]
    address: String
  },
  images: [String], // Array of image URLs
  reportedBy: ObjectId (ref: 'Users', indexed),
  assignedTo: ObjectId (ref: 'Users'),
  verifiedBy: [ObjectId] (ref: 'Users'),
  upvotes: Number,
  upvotedBy: [ObjectId] (ref: 'Users'),
  comments: [{
    user: ObjectId (ref: 'Users'),
    text: String,
    createdAt: Date
  }],
  statusHistory: [{
    status: String,
    updatedBy: ObjectId (ref: 'Users'),
    note: String,
    timestamp: Date
  }],
  resolutionImages: [String],
  resolutionNote: String,
  resolvedAt: Date,
  createdAt: Date (indexed),
  updatedAt: Date
}
```

#### Notifications Collection
```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: 'Users', indexed),
  issue: ObjectId (ref: 'Issues'),
  type: String (enum: ['status_update', 'new_issue', 'verification', 'resolution']),
  message: String,
  read: Boolean (default: false),
  createdAt: Date (indexed)
}
```

### Indexes
- Users: email (unique), role
- Issues: location (2dsphere), reportedBy, status, category, createdAt
- Notifications: user, createdAt, read

## API Design

### Base URL
```
/api/v1
```

### Authentication Endpoints

```
POST   /auth/register          - Register new user
POST   /auth/login             - User login
POST   /auth/forgot-password   - Request password reset
POST   /auth/reset-password    - Reset password
GET    /auth/me                - Get current user
```

### User Endpoints

```
GET    /users/profile          - Get user profile
PUT    /users/profile          - Update user profile
GET    /users/:id/issues       - Get user's reported issues
GET    /users/stats            - Get user statistics
```

### Issue Endpoints

```
POST   /issues                 - Create new issue
GET    /issues                 - Get all issues (with filters)
GET    /issues/:id             - Get issue details
PUT    /issues/:id             - Update issue (authorities)
DELETE /issues/:id             - Delete issue (admin only)
POST   /issues/:id/verify      - Verify issue
POST   /issues/:id/upvote      - Upvote issue
POST   /issues/:id/comment     - Add comment
PUT    /issues/:id/status      - Update issue status
POST   /issues/:id/assign      - Assign issue to authority
GET    /issues/nearby          - Get issues near location
GET    /issues/stats           - Get issue statistics
```

### Notification Endpoints

```
GET    /notifications          - Get user notifications
PUT    /notifications/:id/read - Mark notification as read
PUT    /notifications/read-all - Mark all as read
DELETE /notifications/:id      - Delete notification
```

### Upload Endpoints

```
POST   /upload/image           - Upload issue image
POST   /upload/avatar          - Upload user avatar
```

## Frontend Design

### Component Structure

```
src/
├── components/
│   ├── common/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Modal.jsx
│   │   └── Loader.jsx
│   ├── auth/
│   │   ├── LoginForm.jsx
│   │   ├── RegisterForm.jsx
│   │   └── ProtectedRoute.jsx
│   ├── issues/
│   │   ├── IssueCard.jsx
│   │   ├── IssueList.jsx
│   │   ├── IssueMap.jsx
│   │   ├── IssueDetails.jsx
│   │   ├── IssueForm.jsx
│   │   ├── IssueFilters.jsx
│   │   └── StatusBadge.jsx
│   ├── dashboard/
│   │   ├── DashboardStats.jsx
│   │   ├── IssueChart.jsx
│   │   └── RecentIssues.jsx
│   └── notifications/
│       ├── NotificationList.jsx
│       └── NotificationItem.jsx
├── pages/
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   ├── IssueMapView.jsx
│   ├── IssueListView.jsx
│   ├── IssueDetailPage.jsx
│   ├── CreateIssuePage.jsx
│   ├── Profile.jsx
│   └── NotFound.jsx
├── context/
│   ├── AuthContext.jsx
│   ├── IssueContext.jsx
│   └── NotificationContext.jsx
├── services/
│   ├── api.js
│   ├── authService.js
│   ├── issueService.js
│   ├── notificationService.js
│   └── uploadService.js
├── utils/
│   ├── constants.js
│   ├── helpers.js
│   └── validators.js
├── hooks/
│   ├── useAuth.js
│   ├── useIssues.js
│   └── useGeolocation.js
├── App.jsx
└── index.js
```

### Key Pages & Features

#### 1. Home Page
- Hero section with platform overview
- Quick stats (total issues, resolved issues)
- Call-to-action buttons (Report Issue, View Map)
- Recent issues feed
- How it works section

#### 2. Issue Map View
- Interactive Google Map with issue markers
- Color-coded markers by status
- Cluster markers for dense areas
- Click marker to view issue preview
- Filter panel (category, status, severity)
- Current location button
- Search by address

#### 3. Issue List View
- Grid/List toggle
- Issue cards with image, title, location, status
- Pagination or infinite scroll
- Filter and sort options
- Quick actions (view, upvote)

#### 4. Create Issue Page
- Multi-step form:
  - Step 1: Issue details (title, description, category, severity)
  - Step 2: Location (map picker or auto-detect)
  - Step 3: Upload images (drag-drop or browse)
  - Step 4: Review and submit
- Form validation
- Image preview
- Location preview on map

#### 5. Issue Detail Page
- Full issue information
- Image gallery
- Location map
- Status timeline
- Comments section
- Upvote button
- Share button
- Edit/Delete (for reporter)
- Status update (for authorities)

#### 6. Authority Dashboard
- Statistics cards (total, pending, resolved)
- Charts (issues by category, resolution trends)
- Assigned issues table
- Quick actions (assign, update status)
- Filter by date range, area

#### 7. User Profile
- User information
- Edit profile form
- Reported issues list
- Statistics (issues reported, resolved)
- Activity timeline

### UI/UX Design Principles

#### Color Scheme
- **Primary:** Blue (#2196F3) - Trust, authority
- **Secondary:** Green (#4CAF50) - Success, resolution
- **Warning:** Orange (#FF9800) - Medium severity
- **Danger:** Red (#F44336) - High severity
- **Neutral:** Gray (#757575) - Text, borders

#### Status Colors
- Reported: Gray
- Verified: Blue
- In Progress: Orange
- Resolved: Green
- Closed: Dark Gray

#### Typography
- **Headings:** Inter or Roboto (Bold)
- **Body:** Inter or Roboto (Regular)
- **Size Scale:** 12px, 14px, 16px, 18px, 24px, 32px

#### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## Security Design

### Authentication Flow
1. User submits credentials
2. Server validates and generates JWT token
3. Token stored in httpOnly cookie or localStorage
4. Token sent in Authorization header for protected routes
5. Server validates token on each request

### Authorization
- Role-based access control (RBAC)
- Middleware to check user roles
- Citizens: Create, view, upvote issues
- Authorities: All citizen actions + update status, assign issues
- Volunteers: Verify issues, add comments

### Data Protection
- Password hashing with bcrypt (10 rounds)
- Input sanitization to prevent XSS
- MongoDB injection prevention with Mongoose
- Rate limiting on API endpoints
- CORS configuration
- Helmet.js for security headers

### Image Upload Security
- File type validation (only JPEG, PNG)
- File size limit (5MB per image)
- Virus scanning (optional)
- Secure file naming (UUID)
- CDN with access controls

## Performance Optimization

### Frontend
- Code splitting with React.lazy()
- Image lazy loading
- Debouncing for search inputs
- Memoization with React.memo()
- Virtual scrolling for long lists
- Service worker for caching (PWA)

### Backend
- Database indexing
- Query optimization
- Response caching (Redis optional)
- Image compression before storage
- Pagination for large datasets
- Connection pooling

### Maps
- Marker clustering for dense areas
- Lazy loading map tiles
- Limit visible markers based on zoom level
- Cache geocoding results

## Deployment Architecture

### Development Environment
- Local MongoDB instance
- Node.js development server
- React development server
- Environment variables in .env file

### Production Environment
- **Frontend:** Vercel or Netlify
- **Backend:** Heroku, AWS EC2, or DigitalOcean
- **Database:** MongoDB Atlas
- **Image Storage:** AWS S3 or Cloudinary
- **CDN:** CloudFront or Cloudinary CDN

### CI/CD Pipeline
1. Code push to GitHub
2. Automated tests run
3. Build frontend and backend
4. Deploy to staging environment
5. Manual approval
6. Deploy to production

## Error Handling

### Frontend
- Try-catch blocks for async operations
- Error boundaries for React components
- User-friendly error messages
- Toast notifications for errors
- Fallback UI for failed components

### Backend
- Centralized error handling middleware
- Structured error responses
- Error logging (Winston or Morgan)
- Validation error messages
- HTTP status codes (400, 401, 403, 404, 500)

## Testing Strategy

### Frontend Testing
- Unit tests: Jest + React Testing Library
- Component tests for key components
- Integration tests for user flows
- E2E tests: Cypress (optional)

### Backend Testing
- Unit tests: Jest or Mocha
- API endpoint tests: Supertest
- Database tests with test database
- Authentication tests
- Validation tests

### Test Coverage Goals
- Backend: 70%+ coverage
- Frontend: 60%+ coverage
- Critical paths: 90%+ coverage

## Monitoring & Logging

### Application Monitoring
- Error tracking (Sentry optional)
- Performance monitoring
- API response times
- Database query performance

### Logging
- Request logging (Morgan)
- Error logging (Winston)
- User activity logs
- System logs

### Analytics
- User engagement metrics
- Issue resolution metrics
- Popular issue categories
- Geographic distribution

## Development Timeline (Hackathon)

### Day 1
- Setup project structure
- Database schema implementation
- Authentication system
- Basic API endpoints

### Day 2
- Frontend components
- Issue creation flow
- Map integration
- Image upload

### Day 3
- Dashboard implementation
- Notifications
- Issue tracking features
- Testing and bug fixes

### Day 4
- UI polish
- Performance optimization
- Deployment
- Demo preparation

## Future Technical Enhancements

- WebSocket for real-time updates
- Progressive Web App (PWA)
- GraphQL API
- Microservices architecture
- Machine learning for issue categorization
- Mobile apps with React Native
- Elasticsearch for advanced search
- Redis caching layer
