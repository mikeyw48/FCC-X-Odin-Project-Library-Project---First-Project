const bookForm = document.getElementById("book-form");
const addBookButton = document.getElementById("open-book-form-btn");
const confirmCloseDialog = document.getElementById("confirm-close-dialog");
const closeBookFormButton = document.getElementById("close-book-form-btn");
const cancelButton = document.getElementById("cancel-btn");
const discardButton = document.getElementById("discard-btn");
const titleInput = document.getElementById("title-input");
const dateInput1 = document.getElementById("date-input-start");
const descriptionInput = document.getElementById("description-input");
const addOrUpdateBookButton = document.getElementById("add-or-update-book-btn");
const booksContainer = document.getElementById("books-container");
const dateInput2 = document.getElementById("date-input-end");
const pagesInput = document.getElementById("pages-input");


const bookData = [];
let currentBook = {};





const addOrUpdateBook = () => {
    addOrUpdateBookButton.innerText = "Add Book";
    const dataArrIndex = bookData.findIndex((item) => item.id === currentBook.id);
    const bookObj = {
        id: `${titleInput.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
        title: titleInput.value,
        date1: dateInput1.value,
        date2: dateInput2.value,
        description: descriptionInput.value,
        pages: pagesInput.value,
    }
    if (dataArrIndex === -1) {
        bookData.unshift(bookObj);
    } else {
        bookData[dataArrIndex] = bookObj;
    }
    updateBookContainer();
    reset();
}

const updateBookContainer = () => {
    booksContainer.innerHTML = "";
    bookData.forEach(({ id, title, date1, date2, description, pages })=> {
        booksContainer.innerHTML += `
            <div id="${id}">
                <p><strong>Title: </strong>${title}</p>
                <p><strong>Date Started: </strong>${date1}</p>
                <p><strong>Date Started: </strong>${date2}</p>
                <p><strong>Description: </strong>${description}</p>
                <p><strong>Pages: </strong>${pages}</p>
                    <button onclick="editBook(this)" type="button" class="btn">Edit</button>
                    <button onclick="deleteBook(this)" type="button" class="btn">Delete</button>            
            </div>`
    })
}

const deleteBook = (buttonEl) => {
    const dataArrIndex = bookData.findIndex((item) => item.id === buttonEl.parentElement.id);
    buttonEl.parentElement.remove();
    bookData.splice(dataArrIndex, 1);
    //console.log(bookData)
}

const editBook = (buttonEl) => {
    const dataArrIndex = bookData.findIndex((item) => item.id === buttonEl.parentElement.id);
    currentBook = bookData[dataArrIndex];

    titleInput.value = currentBook.title;
    dateInput1.value = currentBook.date1;
    dateInput2.value = currentBook.date2;
    descriptionInput.value = currentBook.description;
    pagesInput.value = currentBook.pages;

   

    addOrUpdateBookButton.innerText = "Update Book :)";
    bookForm.classList.toggle("hidden");


    console.log(currentBook)
}

const reset = () => {
    bookForm.classList.toggle("hidden");
    titleInput.value = "";
    dateInput1.value = "";
    dateInput2.value = "";
    descriptionInput.value = "";
    pagesInput.value = "";
    currentBook = {};
}


addBookButton.addEventListener("click", () => {
    bookForm.classList.toggle("hidden");
});

closeBookFormButton.addEventListener("click", () => {
    const formInputsContainValues = titleInput.value || dateInput1.value || descriptionInput.value || dateInput2.value || pagesInput.value;
    const formInputValuesUpdated = titleInput.value !== currentBook.title || dateInput1.value !== currentBook.date1 || descriptionInput.value !== currentBook.description || dateInput2.value !== currentBook.date2 || pagesInput.value !== currentBook.pages;
    
    if (formInputsContainValues && formInputValuesUpdated) {
        confirmCloseDialog.showModal();
      } else {
        reset();
      }
    });

cancelButton.addEventListener("click", () => {
    confirmCloseDialog.close();
});

discardButton.addEventListener("click", () => {
    confirmCloseDialog.close();
    reset();
});

bookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    addOrUpdateBook();


    //reset();
    //console.log(bookData)
    //console.log(currentBook)
});


