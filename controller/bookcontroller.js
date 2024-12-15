const { pool } = require ("../postgres/postgres.js");
async function getBooks(req,res){
    try {
        const query = 
        `SELECT title, author 
        FROM books;`;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        console.error(`Error: ${err.message}, stack: ${err.stack}`);
        res.status(500).json({"error":"Internal Server Error"});
    }
}
async function getBook(req,res){
    const {id} = req.params;
    try {
        const query = 
        `SELECT * 
        FROM books
        WHERE id = $1;`;
        const values = [id];
        const result = await pool.query(query,values);
            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Book not found' });
            }
        res.json(result.rows);
    } catch (err) {
        console.error(`Error: ${err.message}, stack: ${err.stack}`);
        res.status(500).json({"error":"Internal Server Error"});
    }
}


async function addBook(req,res){
    const {title,author,year,genre,status} = req.body;
    if (!title || !author){
        return res.status(400).json({error:'Title and Author are required'});
    }
    try{
        const query = 
            `INSERT INTO Books(title, author, year, genre, status)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`
            const values = [title,author,year,genre,status];
            const result = await pool.query(query,values);
        res.status(201).json({Message:"Book Added Successfully"});
    }
    catch (err) {
        console.error(`Error: ${err.message}, stack: ${err.stack}`);
        res.status(500).json({"error":"Internal Server Error"});
    }
}
async function updateBook(req,res){
    const {id} = req.params;
    const {title,author,year,genre,status} = req.body;
    if (!title || !author || !year || !genre){
        return res.status(400).json({error:'Title and Author are required'});
    }
    if (status != 'Available' && status != 'Unavailable'){
        return res.status(400).json({error:'Status does not exist.'});
    }
        try{
                const query = `
                UPDATE books
                SET title = $1, author = $2, year =$3, genre = $4, status = $5
                WHERE id = $6
                RETURNING *;
                `
                const values = [title,author,year,genre,status,id];
                const result = await pool.query(query,values);
            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Book not found' });
            }
            else{
                return res.status(200).json({message: "Updated successfully"});
            }
        }
        catch (err){
            console.error(`Error: ${err.message}, stack: ${err.stack}`);
            res.status(500).json({"error":"Internal Server Error"});
        }
}
async function deleteBook(req,res){
    const {id} = req.params;
    try {
        const query = `
        DELETE FROM books
        WHERE id = $1
        RETURNING *;`
        ;
        const values = [id];
        const result = await pool.query(query, values);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Book not found' });
        }
        return res.status(200).json({
            message: 'Book deleted successfully'});
    }
    catch (err){
        console.error(`Error: ${err.message}, stack: ${err.stack}`);
        res.status(500).json({"error":"Internal Server Error"});
    }
}

async function patchBook(req,res){
    const {id} = req.params;
    const {status} = req.body;

    if(status != 'Unavailable' && status != 'Available'){
        return res.status(400).json({error:"Status does not exist"});
    }
    try{
        const query = `
        UPDATE books
        SET status = $1
        WHERE id = $2
        RETURNING *
        ;`
        const values =[status,id];
        const result = await pool.query(query, values);
            if (result.rows.length === 0) {
                return res.status(404).json({error: 'Book not found' });
            }
        return res.status(200).json({message: 'Book status updated successfully',});
    }

    catch (err) {
    console.error(`Error: ${err.message}, stack: ${err.stack}`);
    res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports = {
    getBooks,
    getBook,
    addBook,
    updateBook,
    deleteBook,
    patchBook
  };