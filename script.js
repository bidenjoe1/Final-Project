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
}