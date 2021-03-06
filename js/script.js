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

    // Event listeners
    bookForm.addEventListener('submit', addBook);
    newBookBtn.addEventListener('click', showForm);
    closeFormBtn.addEventListener('click', () => bookForm.classList.remove('display'));

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
        bookForm.classList.remove('display');

        localStorage.myLibrary = JSON.stringify(myLibrary);
    }

    function showForm(event) {
        bookForm.classList.add('display');
    }

    function removeBook(event) {
        const id = this.parentElement.getAttribute('data-id');
        console.log(myLibrary[0]);
        myLibrary = myLibrary.filter( book => book.id != id);
        booksDiv.removeChild(this.parentElement);
        localStorage.myLibrary = JSON.stringify(myLibrary);
    }

    // Book Class
    class Book {
        constructor(bookTitle, bookAuthor, bookPages, bookID, bookReadFlag) {
            this.title = bookTitle;
            this.author = bookAuthor;
            this.pages = bookPages;
            this.id = bookID;
            this.readFlag = bookReadFlag;
        }

        render() {
        // Create HTML Elements
        const bookDiv = document.createElement('div');
        const bookHeading = document.createElement('h2');
        const bookDescAuthor = document.createElement('p');
        const bookDescPages = document.createElement('p');
        const bookDescRead = document.createElement('p');
        const removeBtn = document.createElement('button');

        // Update Element text content
        bookHeading.textContent = this.title;
        bookDescAuthor.textContent = `Author: ${this.author}`;
        bookDescPages.textContent = `Pages: ${this.pages} pages`;
        bookDescRead.textContent = (this.readFlag) ? 'Mark Unread' : 'Mark Read';
        bookDescRead.classList.add(this.readFlag ? 'book-read-status-read' : 'book-read-status-not-read');
        bookDescRead.addEventListener('click', event => {
            const targetBook = myLibrary.find(book => event.target.parentElement.getAttribute('data-id') == book.id);
            if (targetBook.readFlag) {
                event.target.textContent = 'Mark Read';
                event.target.classList.remove('book-read-status-read');
                event.target.classList.add('book-read-status-not-read');
                event.target.parentElement.classList.remove('read');
                event.target.parentElement.classList.add('not-read');
                targetBook.readFlag = false;
            } else {
                event.target.textContent = 'Mark Unread';
                event.target.classList.remove('book-read-status-not-read');
                event.target.classList.add('book-read-status-read');
                event.target.parentElement.classList.remove('not-read');
                event.target.parentElement.classList.add('read');
                targetBook.readFlag = true;
            }

            localStorage.myLibrary = JSON.stringify(myLibrary);
        });
        bookDescRead.classList.add('book-read-status');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('btn-remove');
        removeBtn.addEventListener('click', removeBook);

        // Append all of the elements to the book div as a child
        bookDiv.appendChild(bookHeading);
        bookDiv.appendChild(bookDescAuthor);
        bookDiv.appendChild(bookDescPages);
        bookDiv.appendChild(bookDescRead);
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
    }

    // Library variables
    let bookCounter = 0;
    let myLibrary = [];
    let myLibraryTemp = JSON.parse(localStorage.myLibrary);
    myLibraryTemp.forEach(book => myLibrary.push(new Book(book.title, book.author, book.pages, bookCounter++, book.readFlag)));
    myLibrary.forEach(book => book.render());
})();