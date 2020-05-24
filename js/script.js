(function(){
    // HTML DOM Elements
    const booksDiv = document.querySelector('.books');

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