(function(){
    // HTML DOM Elements
    const booksDiv = document.querySelector('.books');
    const titleField = document.querySelector('.book-title-field');
    const authorField = document.querySelector('.book-author-field');
    const pagesField = document.querySelector('.book-page-field');
    const readField = document.querySelector('.book-read-field');
    const bookForm = document.querySelector('.new-book-form');
    const newBookBtn = document.querySelector('.new-book-btn');
    const closeFormBtn = document.querySelector('span');

    // Library variables
    let myLibrary = [];
    let bookCounter = 0;

    // Event listeners
    bookForm.addEventListener('submit', addBook);
    newBookBtn.addEventListener('click', showForm);
    closeFormBtn.addEventListener('click', () => bookForm.style.display = 'none');

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
        const book = new Book(bookTitle, bookAuthor, bookPages, bookCounter++, readFlag);
        myLibrary.push(book);
        book.render();

        // Reset fields
        titleField.value = '';
        authorField.value = '';
        pagesField.value = '';

        // Hide form
        bookForm.style.display = 'none';
    }

    function showForm(event) {
        bookForm.style.display = 'flex';
    }

    function removeBook(event) {
        const id = this.parentElement.getAttribute('data-id');
        console.log(myLibrary[0]);
        myLibrary = myLibrary.filter( book => book.id != id);
        booksDiv.removeChild(this.parentElement);
    }

    // Book Class
    function Book(title, author, pages, id, readFlag) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.id = id;
        this.readFlag = readFlag;
    }

    Book.prototype.render = function() {
        // Create HTML Elements
        const bookDiv = document.createElement('div');
        const bookHeading = document.createElement('h2');
        const bookDescAuthor = document.createElement('p');
        const bookDescPages = document.createElement('p');
        const removeBtn = document.createElement('button');

        // Update Element text content
        bookHeading.textContent = this.title;
        bookDescAuthor.textContent = `Author: ${this.author}`;
        bookDescPages.textContent = `Pages: ${this.pages} pages`;
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('btn-remove');
        removeBtn.addEventListener('click', removeBook);

        // Append all of the elements to the book div as a child
        bookDiv.appendChild(bookHeading);
        bookDiv.appendChild(bookDescAuthor);
        bookDiv.appendChild(bookDescPages);
        bookDiv.appendChild(removeBtn);

        // Add book classes
        bookDiv.classList.add('book');
        if(!this.readFlag) {
            bookDiv.classList.add('not-read');
        }

        // Add book id to div as an attribute
        bookDiv.setAttribute('data-id', this.id);

        // Append the book div as a childe to the books div
        booksDiv.appendChild(bookDiv);
    }

    const book = new Book('The Hobbit', 'J.R.R Tolkien', 295, bookCounter++, true);
    book.render();

    const book2 = new Book('Harry Potter', 'J.K Rowling', 1027, bookCounter++, true);
    book2.render();
})();