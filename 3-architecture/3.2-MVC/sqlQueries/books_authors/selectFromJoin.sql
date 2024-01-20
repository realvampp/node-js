SELECT books.book_id, books.title, GROUP_CONCAT(authors.author_name SEPARATOR ', ') AS author, books.year, books.isbn, books.isInUse, books.pages, books.description
FROM books
         LEFT JOIN books_authors ON books.book_id = books_authors.book_id
         LEFT JOIN authors ON books_authors.author_id = authors.author_id
WHERE books.book_id = ? AND books.status = 'active'
GROUP BY books.book_id;

# SELECT books.*, authors.author_name as author
# FROM books_authors
#          JOIN books ON books_authors.book_id = books.book_id
#          JOIN authors on books_authors.author_id = authors.author_id
# WHERE books_authors.book_id = ? AND books.status = 'active';