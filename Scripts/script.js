const bookLibrary = document.getElementById("mainArea");
const addBookBtn = document.getElementById("addBookBtn");
const addBookForm = document.getElementById("addBookForm");
const submitBookBtn = document.getElementById("submitBookInfo");

// event listeners
addBookBtn.addEventListener("click", showAddBookForm);

submitBookBtn.addEventListener("click", addNewBook);

// functions
function showAddBookForm() {
	addBookForm.style.visibility = "visible";
}

function addNewBook() {
	addBookForm.style.visibility = "hidden";
}

//dynamic styling
function setWidth() {
	submitBookBtn.style.width = `${addBookForm.offsetWidth}px`;
}

setWidth();
