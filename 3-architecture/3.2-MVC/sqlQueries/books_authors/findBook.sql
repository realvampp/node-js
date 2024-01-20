SELECT books.book_id as id, books.title, GROUP_CONCAT(authors.author_name SEPARATOR ', ') AS author
FROM books
         LEFT JOIN books_authors ON books.book_id = books_authors.book_id
         LEFT JOIN authors ON books_authors.author_id = authors.author_id
WHERE (books.title LIKE ? OR authors.author_name LIKE ?) AND books.status = 'active'
GROUP BY books.book_id;

# SELECT book_id AS id, title, author FROM books
# WHERE (title LIKE ? OR author LIKE ?) AND status = 'active';