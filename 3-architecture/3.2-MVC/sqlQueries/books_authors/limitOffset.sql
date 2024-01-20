SELECT books.book_id AS id, books.title, GROUP_CONCAT(authors.author_name SEPARATOR ', ') AS author, books.year, books.bookWants AS clicks
FROM books
         LEFT JOIN books_authors ON books.book_id = books_authors.book_id
         LEFT JOIN authors ON books_authors.author_id = authors.author_id
WHERE books.status = 'active'
GROUP BY books.book_id
LIMIT ? OFFSET ?;