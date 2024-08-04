@echo off
REM Configurações do Servidor
set SERVER_USER=root
set SERVER_IP=209.14.152.29
set REMOTE_DIR=/src/docker
set IMAGE_NAME=tela-elevador-gramado
set IMAGE_TAG=latest
set TAR_FILE=%IMAGE_NAME%.tar

REM Diretório do Projeto
set PROJECT_DIR=C:\Users\Ewerton\Desktop\Projetos Dev\TelaElevadorGramado\Front\tela-elevador-gramado
cd /d "%PROJECT_DIR%"

REM Construir a Imagem Docker
echo Building Docker image...
docker build -t %IMAGE_NAME%:%IMAGE_TAG% .

REM Salvar a Imagem como Arquivo Tar
echo Saving Docker image to tar file...
docker save -o %TAR_FILE% %IMAGE_NAME%:%IMAGE_TAG%

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
echo Deleting local Docker image and tar file...
docker rmi %IMAGE_NAME%:%IMAGE_TAG%
del %TAR_FILE%

echo Done!
pause
