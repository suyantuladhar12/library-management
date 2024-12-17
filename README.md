This is a library management CRUD API.
The end points included in this API are:-
  1. GET /Books:- This lists all the books in the database. (Details includes author and title of the book)
  2. GET /Books/:id:- This lists specific book in the database. (Details includes title, author, year, genre and status)
  3. POST /Books:- This allows users to add Books and their details.
  4. UPDATE /Books/:id:- This updates the details of books already existing in the database. (All the details should be updated or atleast mentioned in the query)
  5. DELETE /Books/:id:- This deletes a book from the database. Detecting the book from the parameter i.e id of the book.
  6. PATCH /Books/:id:- This updates a single part of the book's detail which is status which can either be 'Available' or 'Unavailable'.

Made with Pool and Postgres as Database.
