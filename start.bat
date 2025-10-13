@echo off
title Startup Script
setlocal

:: --- Check for Node.js ---
where node >nul 2>nul
if errorlevel 1 (
    echo [ERROR] Nodejs is not installed or not on your PATH.
    echo Please install it from https://nodejs.org/ and try again.
    pause
    exit /b
)

:: --- Start Backend ---
echo.
echo =============================
echo   Starting Backend Server...
echo =============================
pushd backend\dist
start "Backend" node app.js
popd

:: --- Start Frontend ---
echo.
echo =============================
echo   Starting Frontend Server...
echo =============================
pushd frontend\dist
start "Frontend" cmd /c "npx serve -s . -l 5173"
popd

echo.
echo Both backend and frontend have been started.
echo Press any key to exit this launcher...
pause >nul
endlocal
