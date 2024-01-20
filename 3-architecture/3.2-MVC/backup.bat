@echo off

rem Параметры подключения к базе данных
set DB_USER=root
set DB_PASSWORD=12345
set DB_NAME=mydb

rem Путь для сохранения бекапа
set BACKUP_PATH=C:\Users\fakyl\Desktop\backups

rem Имя файла бекапа
set BACKUP_FILE=%BACKUP_PATH%\backup_%date:~10,4%%date:~4,2%%date:~7,2%_%time:~0,2%%time:~3,2%%time:~6,2%.sql

rem Команда mysqldump
mysqldump -u %DB_USER% -p%DB_PASSWORD% %DB_NAME% > %BACKUP_FILE%