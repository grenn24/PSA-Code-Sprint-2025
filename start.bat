@echo off
echo Starting backend...
start "" /D "backend\dist" server.exe

echo Starting frontend...
start "" /D "frontend\dist" npx serve -s . -l 5173

pause