@echo off
REM Definindo as variáveis
set SERVER_IP=38.46.142.216

set CONTAINER_PORT=3000

REM Diretório do Projeto
set PROJECT_DIR=%~dp0
cd /d "%PROJECT_DIR%"

REM Obter o nome da pasta como IMAGE_NAME
for %%i in ("%PROJECT_DIR:~0,-1%") do set IMAGE_NAME=%%~nxi

set CONTAINER_NAME=%IMAGE_NAME%-container

REM Exibindo as variáveis para verificar se estão corretas
echo Server IP: %SERVER_IP%
echo Container Name: %CONTAINER_NAME%
echo Image Name: %IMAGE_NAME%

REM Conectando ao servidor via SSH e executando os comandos
ssh root@%SERVER_IP% "docker ps && docker stop %CONTAINER_NAME% && docker rm %CONTAINER_NAME% && docker rmi %IMAGE_NAME% && cd ~/docker && docker load -i %IMAGE_NAME%.tar && docker run -d -p %CONTAINER_PORT%:%CONTAINER_PORT% --name %CONTAINER_NAME% %IMAGE_NAME%" 

REM Pausar para verificar a saída do comando SSH
pause
