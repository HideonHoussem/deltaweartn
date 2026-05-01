@echo off
echo Pushing to GitHub...
git add .
git commit -m "Final updates and fixes"
git push -u origin main --force
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo PUSH FAILED! 
    echo This is likely because you are not logged into the correct GitHub account.
    echo Please log in to HideonHoussem or use a Personal Access Token.
    pause
) else (
    echo.
    echo PUSH SUCCESSFUL!
    pause
)
