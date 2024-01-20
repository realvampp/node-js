@echo off

rem Параметры подключения к базе данных
set DB_USER=root
set DB_PASSWORD=12345
set DB_NAME=mydb
set DB_HOST=localhost


rem Путь к SQL-скрипту
set SQL_SCRIPT_PATH=D:\programming\shpp\node-js\3-architecture\3.2-MVC\sqlQueries\managing\booksDeletion.sql

rem Команда выполнения SQL-скрипта
mysql -u %DB_USER% -p%DB_PASSWORD% -h %DB_HOST% -D %DB_NAME% < %SQL_SCRIPT_PATH%
