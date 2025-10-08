#!/bin/bash
# Navigate to backend and start server
echo "Starting backend..."
(cd backend/dist && ./server &)

# Navigate to frontend and serve dist folder
echo "Starting frontend..."
(cd frontend/dist && npx serve -s . -l 5173 &)

# Wait for all background processes
wait