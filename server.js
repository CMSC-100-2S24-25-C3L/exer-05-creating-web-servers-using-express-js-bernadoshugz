import express from "express";
import { readFile } from "fs";

// Instantiate the server
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

// Listen to port 3000
app.listen(3000, () => {
    console.log("Server started at port 3000")
});

// Our "Home Page" for now
app.get("/", (req, res) => {
    res.send("Hello! Send a book using needle.");
})

// Respond to POST request "/add-book" from test.js (client)
app.post("/add-book", (req, res) => {
    // Get the body of the request (the book object sent from client)
    const book = req.body;
    if(book.name && book.isbn && book.author && book.year &&
        book.name != "" && book.isbn != "" && book.author != "" && book.year != ""
    ) {
        // This is for the test.js terminal (optional)
        res.send(book);
        console.log({success: true});
    } else {
        res.send("Failed to save book");
        console.log({success: false});
    }
})

// Respond to GET request using ISBN and author
app.get("/find-by-isbn-author", (req, res) => {
    // Get the parameters in the address bar
    var isbn = req.query.isbn;
    var author = req.query.author;

    // Read the file 
    readFile("books.txt", "utf8", (err, data) => {
        // If file does not exist
        if (err) {
            return res.send("Error, no file found.");
        }
        
        // Since it will read the whole file, separate it per line
        var lines = data.split("\n");

        // Now iterate per line to find our book
        for(var i=0; i < lines.length; i++){
            var book = lines[i].split(",");
            if(book[1] == isbn && book[2] == author){
                // Show the browser you found the book
                return res.send(book.join());
            }
        }
        res.send("Book not found.");
    })
    
})

// Respond to GET request using the author as only parameter
app.get("/find-by-author", (req, res) => {
    // Get the author parameter in the address bar
    var author = req.query.author;

    // Read the file 
    readFile("books.txt", "utf8", (err, data) => {
        // If file does not exist
        if (err) {
            return res.send("Error, no file found.");
        }
        
        // Since it will read the whole file, separate it per line
        var lines = data.split("\n");
        var books = [];

        // Now iterate per line to find the books of the author
        for(var i=0; i < lines.length; i++){
            var book = lines[i].split(",");
            if(book[2] == author){
                books.push(book.join());
            }
        }
        
        if(books.length > 0) {
            res.json(books);
        } else {
            res.send("Author not found.")
        }
    })
    
})