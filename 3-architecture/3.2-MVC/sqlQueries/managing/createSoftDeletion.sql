CREATE EVENT delete_old_books
    ON SCHEDULE EVERY 1 DAY
    DO
    DELETE FROM books
    WHERE status = 'deleted';