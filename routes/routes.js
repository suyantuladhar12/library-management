const express = require ("express");
const {getBooks,getBook, addBook, updateBook, deleteBook, patchBook}  = require ("../controller/bookcontroller.js");

const router = express.Router();

router.get("/Books",getBooks);
router.get("/Books/:id",getBook);
router.post("/Books",addBook);
router.put("/Books/:id",updateBook);
router.delete("/Books/:id",deleteBook);
router.patch("/Books/:id",patchBook);

module.exports = {
    router
  };
