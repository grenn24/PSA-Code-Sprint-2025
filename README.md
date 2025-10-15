# PSA Horizon
**Project for PSA Code Sprint 2025**
Prototype:  
Staging Website: https://psa-code-sprint-2025.vercel.app  
API Endpoint: https://psa-code-sprint-2025.onrender.com/api

## Overview
PSA Horizon is an integrated employee development platform designed to empower PSA staff through mentorship, career growth, and well-being support.

## Core Features
### Career Dashboard
- Track your career path and skill progress
- View recommended courses and event opportunities

### Events Hub
- View recommended and trending employee-initiated events
- Online calls

### Mentor Matching
- Intelligent matching suggestions based on interests, skills, and career aspirations
- Explore potential mentorship connections and send personalised invites
- Real-time communication between mentors and mentees (text and video)

### Wellness Buddy
- Offer practical and personalised advice to personal wellbeing
- Track historical mood changes from past conversations
- Engage in short guided activities (e.g. mindfulness)
- Dashboard showing key mood indicators


## User Guide
- Default account:  
  Email: gren@gmail.com
  Password: password123
- Or, create a new account at /sign-up
### Remotely
Visit the staging site at:  
https://psa-code-sprint-2025.vercel.app
### Locally
1. Ensure that your machine has the following installed:
   - node.js
   - npm
   - serve
2. Download the latest executable *Codes_Gren.zip* from the [releases]("https://github.com/grenn24/PSA-Code-Sprint-2025") page
3. Ensure that ports **3000** and **5173** are available
4. Open command prompt in the root folder
5. Running the startup script:  
   - Windows: start.bat
   - Linux/MacOS: ./start.sh

## Data Management
### MongoDB
- The application uses MongoDB as its primary database to store structured data such as user info and wellness buddy conversations.
- Relevant scripts are located in the **/scripts/mongodb** directory.
- Delete all collections, documents, indexes in the database:
```
npm run db:clear
```
- Seed the database with sample user and chat data:
```
npm run db:seed
```

### Vector Embedding
- The application utilises a vector database (Pinecone) to store embeddings generated from document data for boosting answer accuracy
- Each namespace within Pinecone corresponds directly to a subdirectory under the **/data** folder
- Add new data (in PDF) into a new or existing sub-directory within the **/data** folder
- Clear all existing records in the Pinecone index:
```
npm run vdb:clear
```
- Re-seed the index with latest embeddings:
```
npm run vdb:seed
```

## Tech Stack
| Layer | Technology |
| :----------- | :------------ |
| Frontend | React (Vite), Tailwind CSS, WebRTC |
| Backend | Express.js, Node.js, WebSocket |
| Data | Mongoose, Cloudflare R2, Redis |
| Deployment | Vercel (frontend), Render (backend), MongoDB Atlas (db) |

## Routes
### Frontend
| Page | Route | Description |
| :----------- | :------------ | :------------ |
| Log In | /log-in | Sign in to account |
| Sign Up | /sign-up | Create new account |
| Home (Career Dashboard) | / | Career path progress, recommended courses and notifications |
| Mentor Matching | /mentor | Chat, explore and connect with mentors |
| Wellness Buddy | /wellness-buddy | AI-powered emotional support chatbot |
| Profile Page | /profile | User profile page |

### Backend
| Method | Route | Description | Authentication |
| :----------- | :------------ | :------------ | :------------ |
| POST | /api/auth/log-in | User Log In | No |
| POST | /api/auth/sign-up | User Sign Up | No |
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