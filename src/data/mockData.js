export const DELHI_COLONIES = [
  'Lajpat Nagar',
  'Mayur Vihar Phase II',
  'Rohini Sector 22',
  'Dwarka Sector 12',
  'Vasant Kunj',
  'Greater Kailash I',
  'Pitampura',
  'Janakpuri',
  'Nehru Place',
  'Malviya Nagar',
]

export const CATEGORIES = [
  'Garbage',
  'Pothole',
  'Streetlight',
  'Street Dogs',
  'Safety',
]

export const INITIAL_ISSUES = [
  {
    id: 1001,
    colony: 'Lajpat Nagar',
    category: 'Garbage',
    street: 'Near Block C Park',
    description: 'Large garbage pile accumulating for 3 days',
    image:
      'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=400&h=400&fit=crop',
    status: 'Verified',
    distance: '0.4 km',
    aiCheck: 'Likely Match',
    verificationCount: 4,
    reporter: 'Anonymous',
    createdAt: new Date(2026, 0, 27, 14, 30),
    timeline: [
      {
        step: 'Reported',
        timestamp: new Date(2026, 0, 27, 14, 30),
        actor: 'Anonymous',
      },
      {
        step: 'Verified',
        timestamp: new Date(2026, 0, 27, 18, 45),
        actor: 'Verified by 4 residents',
      },
    ],
  },
  {
    id: 1002,
    colony: 'Lajpat Nagar',
    category: 'Pothole',
    street: 'Central Market Road',
    description: 'Deep pothole causing accidents',
    image:
      'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=400&h=400&fit=crop',
    status: 'Assigned',
    distance: '0.8 km',
    aiCheck: 'Likely Match',
    verificationCount: 5,
    reporter: 'Resident #2245',
    createdAt: new Date(2026, 0, 26, 9, 15),
    timeline: [
      {
        step: 'Reported',
        timestamp: new Date(2026, 0, 26, 9, 15),
        actor: 'Resident #2245',
      },
      {
        step: 'Verified',
        timestamp: new Date(2026, 0, 26, 12, 30),
        actor: 'Verified by 5 residents',
      },
      {
        step: 'Assigned',
        timestamp: new Date(2026, 0, 27, 10, 0),
        actor: 'PWD Delhi',
      },
    ],
  },
  {
    id: 1003,
    colony: 'Lajpat Nagar',
    category: 'Streetlight',
    street: 'Block D Main Road',
    description: 'Streetlight not working for 2 weeks',
    image:
      'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=400&h=400&fit=crop',
    status: 'In Progress',
    distance: '1.2 km',
    aiCheck: 'Likely Match',
    verificationCount: 3,
    reporter: 'Anonymous',
    createdAt: new Date(2026, 0, 25, 20, 0),
    timeline: [
      {
        step: 'Reported',
        timestamp: new Date(2026, 0, 25, 20, 0),
        actor: 'Anonymous',
      },
      {
        step: 'Verified',
        timestamp: new Date(2026, 0, 26, 8, 0),
        actor: 'Verified by 3 residents',
      },
      {
        step: 'Assigned',
        timestamp: new Date(2026, 0, 27, 9, 30),
        actor: 'NDMC',
      },
      {
        step: 'In Progress',
        timestamp: new Date(2026, 0, 28, 14, 0),
        actor: 'NDMC Crew #12',
      },
    ],
  },
  {
    id: 1004,
    colony: 'Mayur Vihar Phase II',
    category: 'Street Dogs',
    street: 'Pocket A Market Area',
    description: 'Aggressive stray dogs creating safety issues',
    image:
      'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&h=400&fit=crop',
    status: 'Verified',
    distance: '0.2 km',
    aiCheck: 'Unclear',
    verificationCount: 7,
    reporter: 'Resident #5512',
    createdAt: new Date(2026, 0, 28, 7, 30),
    timeline: [
      {
        step: 'Reported',
        timestamp: new Date(2026, 0, 28, 7, 30),
        actor: 'Resident #5512',
      },
      {
        step: 'Verified',
        timestamp: new Date(2026, 0, 28, 15, 0),
        actor: 'Verified by 7 residents',
      },
    ],
  },
  {
    id: 1005,
    colony: 'Mayur Vihar Phase II',
    category: 'Safety',
    street: 'Metro Station Exit Road',
    description: 'No street lighting, unsafe for women at night',
    image:
      'https://images.unsplash.com/photo-1505322747495-6afdd3b70760?w=400&h=400&fit=crop',
    status: 'Reported',
    distance: '0.6 km',
    aiCheck: 'Likely Match',
    verificationCount: 1,
    reporter: 'Anonymous',
    createdAt: new Date(2026, 0, 28, 21, 15),
    timeline: [
      {
        step: 'Reported',
        timestamp: new Date(2026, 0, 28, 21, 15),
        actor: 'Anonymous',
      },
    ],
  },
  {
    id: 1006,
    colony: 'Lajpat Nagar',
    category: 'Garbage',
    street: 'Ring Road Service Lane',
    description: 'Overflowing bins',
    image:
      'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=400&h=400&fit=crop',
    status: 'Resolved',
    distance: '1.5 km',
    aiCheck: 'Likely Match',
    verificationCount: 3,
    reporter: 'Resident #8821',
    createdAt: new Date(2026, 0, 24, 11, 0),
    timeline: [
      {
        step: 'Reported',
        timestamp: new Date(2026, 0, 24, 11, 0),
        actor: 'Resident #8821',
      },
      {
        step: 'Verified',
        timestamp: new Date(2026, 0, 24, 16, 0),
        actor: 'Verified by 3 residents',
      },
      {
        step: 'Assigned',
        timestamp: new Date(2026, 0, 25, 8, 0),
        actor: 'MCD South',
      },
      {
        step: 'Resolved',
        timestamp: new Date(2026, 0, 26, 14, 30),
        actor: 'MCD Sanitation Team',
      },
    ],
  },
]

export const INITIAL_USERS = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    colony: 'Lajpat Nagar',
    civicScore: 285,
    level: 'Gold',
    badges: ['Night Watcher', 'Clean Streets'],
  },
  {
    id: 2,
    name: 'Priya Sharma',
    colony: 'Lajpat Nagar',
    civicScore: 220,
    level: 'Silver',
    badges: ['Clean Streets'],
  },
  {
    id: 3,
    name: 'Amit Verma',
    colony: 'Lajpat Nagar',
    civicScore: 195,
    level: 'Silver',
    badges: ['Night Watcher'],
  },
  {
    id: 4,
    name: 'Neha Gupta',
    colony: 'Lajpat Nagar',
    civicScore: 150,
    level: 'Bronze',
    badges: [],
  },
  {
    id: 5,
    name: 'Vikram Singh',
    colony: 'Lajpat Nagar',
    civicScore: 125,
    level: 'Bronze',
    badges: ['Clean Streets'],
  },
  {
    id: 6,
    name: 'Anjali Desai',
    colony: 'Mayur Vihar Phase II',
    civicScore: 310,
    level: 'Gold',
    badges: ['Night Watcher', 'Clean Streets'],
  },
  {
    id: 7,
    name: 'Rohit Mehta',
    colony: 'Mayur Vihar Phase II',
    civicScore: 240,
    level: 'Silver',
    badges: ['Clean Streets'],
  },
]
