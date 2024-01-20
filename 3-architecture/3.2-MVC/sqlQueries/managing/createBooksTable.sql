-- auto-generated definition
create table books
(
    book_id        int auto_increment
        primary key,
    title          varchar(100)                                   null,
    author         varchar(100)                                   null,
    description    varchar(1000)              default 'Описание.' null,
    year           int                                            null,
    pages          int                                            null,
    isbn           varchar(20)                default '---'       null,
    isInUse        tinyint(1)                 default 0           null,
    bookPageVisits int                        default 0           null,
    bookWants      int                        default 0           null,
    status         enum ('active', 'deleted') default 'active'    not null
);

