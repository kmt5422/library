(function(){
    // HTML DOM Elements
    const booksDiv = document.querySelector('.books');
    const titleField = document.querySelector('.book-title-field');
    const authorField = document.querySelector('.book-author-field');
    const pagesField = document.querySelector('.book-page-field');
    const readField = document.querySelector('.book-read-field');
    const bookForm = document.querySelector('.new-book-form');

    // Library variables
    let myLibrary = [];

    // Event listeners
    bookForm.addEventListener('submit', addBook);

    // Helper functions
    function addBook(event) {
        // Prevents page from reloading
        event.preventDefault();

        // Get book info from fields
        const bookTitle = titleField.value;
        const bookAuthor = authorField.value;
        const bookPages = pagesField.value;
        const readFlag = (readField.value === 'true');

        // Create a book and add it to the page
        const book = new Book(bookTitle, bookAuthor, bookPages, readFlag);
        myLibrary.push(book);
        book.render();

        // Reset fields
        titleField.value = '';
        authorField.value = '';
        pagesField.value = '';
    }

    // Book Class
    function Book(title, author, pages, readFlag) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.readFlag = readFlag;
    }

    Book.prototype.render = function() {
        // Create HTML Elements
        const bookDiv = document.createElement('div');
        const bookHeading = document.createElement('h2');
        const bookDescAuthor = document.createElement('p');
        const bookDescPages = document.createElement('p');

        // Update Element text content
        bookHeading.textContent = this.title;
        bookDescAuthor.textContent = `Author: ${this.author}`;
        bookDescPages.textContent = `Pages: ${this.pages} pages`;

        // Append all of the elements to the book div as a child
        bookDiv.appendChild(bookHeading);
        bookDiv.appendChild(bookDescAuthor);
        bookDiv.appendChild(bookDescPages);

        // Add book class
        bookDiv.classList.add('book');

        // Append the book div as a childe to the books div
        booksDiv.appendChild(bookDiv);
    }

    const book = new Book('The Hobbit', 'J.R.R Tolkien', 295, true);
    book.render();

    const book2 = new Book('Harry Potter', 'J.K Rowling', 1027, true);
    book2.render();
})();