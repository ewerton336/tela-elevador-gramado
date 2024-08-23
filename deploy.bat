@echo off
REM Configurações do Servidor
set SERVER_USER=root
set SERVER_IP=38.46.142.216
set SERVER_PORT=3000
set REMOTE_DIR=~/docker
set IMAGE_TAG=latest

REM Diretório do Projeto
set PROJECT_DIR=%~dp0
cd /d "%PROJECT_DIR%"

REM Obter o nome da pasta como IMAGE_NAME
for %%i in ("%PROJECT_DIR:~0,-1%") do set IMAGE_NAME=%%~nxi
set TAR_FILE=%IMAGE_NAME%.tar

REM Verificar se Docker ou Podman está instalado
where docker >nul 2>nul
if %ERRORLEVEL%==0 (
    set CONTAINER_TOOL=docker
    echo Docker found.
) else (
    where podman >nul 2>nul
    if %ERRORLEVEL%==0 (
        set CONTAINER_TOOL=podman
        echo Podman found.
    ) else (
        echo Neither Docker nor Podman was found. Exiting...
        exit /b
    )
)

REM Construir a Imagem
echo Building %CONTAINER_TOOL% image...
%CONTAINER_TOOL% build -t %IMAGE_NAME% .

REM Salvar a Imagem como Arquivo Tar
echo Saving %CONTAINER_TOOL% image to tar file...
%CONTAINER_TOOL% save -o %TAR_FILE% %IMAGE_NAME%

REM Transferir a Imagem para o Servidor
echo Transferring image to remote server...
scp %TAR_FILE% %SERVER_USER%@%SERVER_IP%:%REMOTE_DIR%

REM Executar Comandos no Servidor Remoto
REM echo Running Docker container on remote server...
REM ssh %SERVER_USER%@%SERVER_IP% ^"
REM echo Stopping previous container && docker stop %IMAGE_NAME%-container && docker rm %IMAGE_NAME%-container && ^
REM echo Loading sent container && docker load -i %REMOTE_DIR%/%TAR_FILE% && ^
REM echo Running container && docker run -d -p %SERVER_PORT%:3000 --name %IMAGE_NAME%-container %IMAGE_NAME% ^"

REM Excluir a Imagem Local
echo Deleting local %CONTAINER_TOOL% image and tar file...
%CONTAINER_TOOL% rmi %IMAGE_NAME%
del %TAR_FILE%

echo Done!
pause
