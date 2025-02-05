document.addEventListener("DOMContentLoaded", function () {
    displayBooks();
});

function addBook(event) {
    event.preventDefault();

    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let summary = document.getElementById("summary").value;
    let isRead = document.getElementById("isRead").checked;

    if (title === "" || author === "" || summary === "") {
        alert("Please fill in all required fields.");
        return;
    }

    let book = { title, author, summary, isRead};
    let books = JSON.parse(localStorage.getItem("books")) || [];
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));

    alert("Book added successfully!")
    document.getElementById("BookForm").reset();

}

function displayBooks() {
    const books = JSON.parse(localStorage.getItem("books")) || [];
    const bookList = document.getElementById("BookList");

    if(!BookList) return;

    bookList.innerHTML = "";
    books.forEach((book, index) => {
        let bookItem = document.createElement("div");
        bookItem.classList.add("book-item");

        bookItem.innerHTML = `
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Summary:</strong> ${book.summary}</p>
            <p><strong>Status:</strong> ${book.isRead ? "Read ✅" : "Unread ❌"}</p>
            <button onclick="deleteBook(${index})">Delete</button>
        `;

        bookList.appendChild(bookItem);
    });

}

function deleteBook(index) {
    var books = JSON.parse(localStorage.getItem("books")) || [];
    if (confirm("Are you sure you want to delete this book?")) {
        books.splice(index, 1);
        localStorage.setItem("books", JSON.stringify(books));
        displayBooks();
    }
}

function searchBooks() {
    const query = document.getElementById("SearchBar").value.trim().toLowerCase();
    const books = JSON.parse(localStorage.getItem("books")) || [];
    const searchResults = document.getElementById("searchResults");

    searchResults.innerHTML = ""; 

    
    const filteredBooks = books.filter(book => {
        let isMatch = query.length > 0 && (
            (book.title?.toLowerCase() || "").includes(query) ||
            (book.author?.toLowerCase() || "").includes(query) ||
            (book.summary?.toLowerCase() || "").includes(query)
        );
        
        console.log(`Checking: ${book.title} | Match: ${isMatch}`); 
        return isMatch;
    });

    console.log("Filtered Books:", filteredBooks); 

    if (filteredBooks.length === 0) {
        searchResults.innerHTML = "<p>No books found.</p>";
    } else {
        filteredBooks.forEach(book => {
            const bookItem = document.createElement("div");
            bookItem.classList.add("book-item");
            bookItem.innerHTML = `
                <h3>${book.title}</h3>
                <p><strong>Author:</strong> ${book.author}</p>
                <p><strong>Summary:</strong> ${book.summary}</p>
                <p><strong>Status:</strong> ${book.isRead ? "Read ✅" : "Unread ❌"}</p>
            `;
            searchResults.appendChild(bookItem);
        });
    }
}




const bookForm = document.getElementById("BookForm");
if(bookForm) {
    bookForm.addEventListener("submit", addBook);
}

