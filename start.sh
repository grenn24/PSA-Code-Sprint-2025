echo "Starting backend..."
(cd backend/dist && node app.js > backend.log 2>&1 &)
BACKEND_PID=$!

echo "Starting frontend..."
(cd frontend/dist && npx serve -s . -l 5173 > frontend.log 2>&1 &)
FRONTEND_PID=$!

wait $BACKEND_PID $FRONTEND_PID