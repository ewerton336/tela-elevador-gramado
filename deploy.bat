@echo off
REM Configurações do Servidor
set SERVER_USER=root
set SERVER_IP=209.14.152.29
set REMOTE_DIR=/src/docker

REM Diretório do Projeto
set PROJECT_DIR=%~dp0
cd /d "%PROJECT_DIR%"

REM Obter o nome da pasta como IMAGE_NAME
for %%i in ("%PROJECT_DIR:~0,-1%") do set IMAGE_NAME=%%~nxi
set IMAGE_TAG=latest
set TAR_FILE=%IMAGE_NAME%.tar

REM Verificar se Docker ou Podman está instalado
where docker >nul 2>nul
if %ERRORLEVEL%==0 (
    set CONTAINER_TOOL=docker
) else (
    where podman >nul 2>nul
    if %ERRORLEVEL%==0 (
        set CONTAINER_TOOL=podman
    ) else (
        echo Neither Docker nor Podman is installed. Exiting.
        exit /b 1
    )
)

REM Construir a Imagem
echo Building %CONTAINER_TOOL% image...
%CONTAINER_TOOL% build -t %IMAGE_NAME%:%IMAGE_TAG% .

REM Salvar a Imagem como Arquivo Tar
echo Saving %CONTAINER_TOOL% image to tar file...
%CONTAINER_TOOL% save -o %TAR_FILE% %IMAGE_NAME%:%IMAGE_TAG%

REM Transferir a Imagem para o Servidor
echo Transferring image to remote server...
scp %TAR_FILE% %SERVER_USER%@%SERVER_IP%:%REMOTE_DIR%

REM Executar Comandos no Servidor Remoto
echo Running Docker container on remote server...
ssh %SERVER_USER%@%SERVER_IP% ^
"docker load -i %REMOTE_DIR%/%TAR_FILE% && ^
docker stop %IMAGE_NAME%-container && docker rm %IMAGE_NAME%-container && ^
docker run -d -p 3001:3000 --name %IMAGE_NAME%-container %IMAGE_NAME%:%IMAGE_TAG%"

REM Excluir a Imagem Local
echo Deleting local %CONTAINER_TOOL% image and tar file...
%CONTAINER_TOOL% rmi %IMAGE_NAME%:%IMAGE_TAG%
del %TAR_FILE%

echo Done!
pause
