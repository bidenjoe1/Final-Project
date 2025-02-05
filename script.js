function addBook(event) {
    event.preventDefault();

    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let summary = document.getElementById("summary").value;
    let confirmRead = document.getElementById("isRead").checked;

    if (title === "" || author === "") {
        alert("Please fill in all required fields.");
        return;
    }
}