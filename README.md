# PSA Horizon
**Project for PSA Code Sprint 2025**
Staging Website: https://psa-code-sprint-2025.vercel.app
API Endpoint: https://psa-code-sprint-2025.onrender.com/api

## Overview
PSA Horizon is an integrated employee development platform designed to empower PSA staff through mentorship, career growth, and well-being support.

## Core Features
### Career Dashboard
- Track your career path and skill progress
- View recommended courses and event opportunities

### Mentor Matching
- Intelligent matching suggestions based on interests, skills, and career aspirations
- Explore potential mentorship connections and send personalised invites
- Real-time communication between mentors and mentees (text and video)

### Wellness Buddy
- AI-powered companion that aims to provide emotional support for PSA's employees
- Offer practical advice that can improve in personal wellbeing
- Tracks historical mood changes from past conversatios

## Getting Started
1. Ensure that your machine has the following installed:
   - node.js
   - npm
   - git
2. Download the latest executable *Codes_Gren.zip* from the [releases]("https://github.com/grenn24/PSA-Code-Sprint-2025") page
3. Ensure that ports **3000** and **5173** are available
4. In the root folder, run ./start-all.bat (Windows) or ./start-all.sh (Linux)

## Directory Structure
root/
├── backend/
├── common/
├── frontend/
├── package.json
└── README.md

## Tech Stack
| Layer | Technology |
| :----------- | :------------ |
| Frontend | React (Vite), Tailwind CSS |
| Backend | Express.js, Node.js, WebSocket |
| Data | MongoDB, Cloudflare R2 |
| Deployment | Vercel (frontend), Render (backend) |

## Routes
### Frontend
| Page | Route | Description |
| :----------- | :------------ | :------------ |
| Home (Career Dashboard) | / | Career path progress, recommended courses and notifications |
| Mentor Matching | /mentor | Chat, explore and connect with mentors |
| Wellness Buddy | /wellness-buddy | AI-powered emotional support chatbot |

### Backend
| Method | Route | Description | Authentication |
| :----------- | :------------ | :------------ | :------------ |
| POST | /api/auth/log-in | User Login | No |
| GET | /api/user | Get all users | Yes |
| GET | /api/user/:id | Get a specific user by id | Yes |
| GET | /api/user/:id/top-matches | Get top mentor matches for a user | Yes |
| GET | /api/user/:id/chats | Get existing mentor-mentee chats for a user | Yes |
| GET | /api/user/:id/wb | Get existing wellness buddy conversations for a user | Yes |
| POST | /api/user/:id/mentor-requests | Send a mentorship request | Yes |
| PUT | /api/user/:id | Update user info | Yes |
| POST | /api/chat | Create a new mentor-mentee chat | Yes |
| POST | /api/chat/:id/message | Post a mentor-mentee chat message | Yes |
| PUT | /api/chat/:id/message/:id | Update an existing mentor-mentee chat message | Yes |

> **Note:** Notifications, chat updates and wellness buddy interactions are handled using websocket