const bookLibrary = document.getElementById("libraryArea");
const addBookBtn = document.getElementById("addBookBtn");
const addBookForm = document.getElementById("addBookForm");
const submitBookBtn = document.getElementById("submitBookInfoBtn");
const pageHeader = document.getElementsByTagName("header");
const pageFooter = document.getElementsByTagName("footer");
const checkBox = document.getElementsByClassName("checkBox");
const settingsDots = document.getElementsByClassName("settingsDots");
const removeBookBtns = document.getElementsByClassName("removeBookBtn");
let unreadList = document.getElementsByClassName("unread");
let sliderList = document.getElementsByClassName("slider");

let library = [];
let bookIndex = 0;

function Book(title, author, pages, isRead, i) {
	this.title = title;
	this.author = author;
	this.pageCount = pages;
	this.isRead = isRead;
	this.bookNumber = i;
}
//
//
//
//
//
//
//
//
//
//
// event listeners
addBookBtn.addEventListener("click", showAddBookForm);

addBookForm.addEventListener("submit", addNewBook);

addBookForm.addEventListener("reset", cancelAddNewBook);
//
//
//
//
//
//
//
//
//
// functions
function showAddBookForm() {
	addBookForm.style.visibility = "visible";
	addBookDisablePage();
}

function addNewBook() {
	event.preventDefault();
	addBookForm.style.visibility = "hidden";

	let bookTitle = document.getElementById("bookTitle").value;
	let authorName = document.getElementById("authorEntry").value;
	let pageCount = document.getElementById("pagesEntry").value;
	let bookRead = document.getElementById("bookRead").checked;

	let newBook = new Book(bookTitle, authorName, pageCount, bookRead, bookIndex);

	bookIndex++;

	enablePage();
	createBookCard(newBook);
	addBookForm.reset();
}

function cancelAddNewBook() {
	addBookForm.style.visibility = "hidden";

	enablePage();
}

function createBookCard(book) {
	library.push(book);

	let bookDiv = document.createElement("div");
	bookDiv.classList.add("book");
	bookDiv.setAttribute("bookNumber", `${book.bookNumber}`);

	let titleSwitchDiv = document.createElement("div");

	let bookTitle = document.createElement("h3");
	bookTitle.classList.add("bookCardTitle");
	bookTitle.innerText = `${book.title}`;

	let switchDotDiv = document.createElement("div");
	switchDotDiv.classList.add("switchDots");

	let readSwitch = document.createElement("label");
	readSwitch.classList.add("switch");

	let readCheck = document.createElement("input");
	readCheck.setAttribute("type", "checkbox");
	readCheck.classList.add("checkBox");
	if (book.isRead) {
		readCheck.setAttribute("checked", "");
	}

	let settingsDotsDiv = document.createElement("div");
	settingsDotsDiv.setAttribute("onclick", "showSettingsDrop(this)");
	settingsDotsDiv.classList.add("settingsDots");

	bookLibrary.appendChild(bookDiv);
	bookDiv.appendChild(titleSwitchDiv);
	titleSwitchDiv.appendChild(bookTitle);
	titleSwitchDiv.appendChild(switchDotDiv);
	switchDotDiv.appendChild(readSwitch);
	switchDotDiv.appendChild(settingsDotsDiv);
	readSwitch.appendChild(readCheck);
	readSwitch.innerHTML += `<span class="slider"></span>
	<span class="unread">UNREAD</span>
	<span class="read">READ</span>`;
	settingsDotsDiv.innerHTML += `<span></span><span></span><span></span><div class="settingsDropdown"><span onclick='editBookCard(this)' style="color: #555;">Edit Book</span><hr style="color: #555;"><span onclick='removeBookCard(this)' style="color: red;">Remove Book</span></div>`;
	bookDiv.innerHTML += `<span class="bookInfo">Author: ${book.author}</span>
	<span class="bookInfo">Pages: ${book.pageCount}</span>`;
}

function removeBookCard(subject) {
	let bookCard =
		subject.parentElement.parentElement.parentElement.parentElement
			.parentElement;
	let bookCardBookNumber = bookCard.getAttribute("bookNumber");
	let libraryIndex = library.indexOf(
		library.find((e) => e.bookNumber == bookCardBookNumber)
	);

	library.splice(libraryIndex, 1);

	bookCard.remove();
}
//
//
//
//
//
//
//
//
//
//
//dynamic styling
function setWidth() {
	submitBookBtn.style.width = `${addBookForm.offsetWidth}px`;
}
setWidth();

function addBookDisablePage() {
	pageHeader[0].style.opacity = "0.3";
	pageFooter[0].style.opacity = "0.3";
	bookLibrary.style.opacity = "0.3";
	addBookBtn.setAttribute("disabled", "");

	for (let i = 0; i < checkBox.length; i++) {
		checkBox[i].setAttribute("disabled", "");
		unreadList[i].style.cursor = "default";
		sliderList[i].style.cursor = "default";
	}
}

function enablePage() {
	pageHeader[0].style.opacity = "1";
	pageFooter[0].style.opacity = "1";
	bookLibrary.style.opacity = "1";
	addBookBtn.removeAttribute("disabled");

	for (let i = 0; i < checkBox.length; i++) {
		checkBox[i].removeAttribute("disabled");
		unreadList[i].style.cursor = "pointer";
		sliderList[i].style.cursor = "pointer";
	}
}

function setLibraryAreaMarginTop() {
	bookLibrary.style.marginTop = `${pageHeader[0].offsetHeight + 30}px`;
}
setLibraryAreaMarginTop();

function showSettingsDrop(subject) {
	let targetDiv = subject.children[3];

	if (targetDiv.style.visibility !== "hidden") {
		targetDiv.style.visibility = "hidden";
	} else {
		targetDiv.style.visibility = "visible";
	}
}
