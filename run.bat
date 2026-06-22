@echo off
setlocal

set "ROOT=%~dp0"
set "NODE_EXE=%ROOT%tools\node\node.exe"
set "PYTHON_EXE=python"
set "FRONTEND_PORT=8080"
set "BACKEND_PORT=3000"

if not exist "%NODE_EXE%" (
  echo [ERROR] Node.js not found: "%NODE_EXE%"
  echo Run tests once or place local Node runtime into tools\node\
  exit /b 1
)

where %PYTHON_EXE% >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Python not found in PATH.
  exit /b 1
)

echo Starting MathMentor Flow backend on http://localhost:%BACKEND_PORT%
start "MathMentor Backend" cmd /k "cd /d "%ROOT%backend" && "%NODE_EXE%" src\server.js"

echo Starting frontend server on http://localhost:%FRONTEND_PORT%
start "MathMentor Frontend" cmd /k "cd /d "%ROOT%" && %PYTHON_EXE% -m http.server %FRONTEND_PORT%"

timeout /t 2 >nul
start "" "http://localhost:%FRONTEND_PORT%"

echo.
echo Frontend: http://localhost:%FRONTEND_PORT%
echo Backend:  http://localhost:%BACKEND_PORT%
echo.
echo Close the opened terminal windows to stop the servers.

endlocal
