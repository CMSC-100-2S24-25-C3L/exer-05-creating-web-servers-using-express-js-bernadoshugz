import needle from "needle";
import { appendFileSync } from "fs";

// Create an object for the book values
var book = {
    name: "Pretty Please, Kitsune Guuji?",
    isbn: "123-456-789",
    author: "Eay Okim",
    year: "2021",
} 

// POST Method to add a book to the server
needle.post(
    "http://localhost:3000/add-book",
    book,
    (err, res) => {
        console.log(res.body);
        saveBook(book);
    }
);

// This function saves a book to a file
function saveBook(book) {
    if(book.name != null && book.isbn != null && book.author != null && book.year != null){
        if(book.name != "" && book.isbn != "" && book.author != "" && book.year != ""){
            appendFileSync("books.txt", book.name + ",");
            appendFileSync("books.txt", book.isbn + ",");
            appendFileSync("books.txt", book.author + ",");
            appendFileSync("books.txt", book.year);
            appendFileSync("books.txt", "\n");
        }  
    }
}