const libraryList = document.querySelector(".library-list");
let addBtn = document.querySelector(".add-button");
let entryBox = document.querySelector(".entry-box");
let submitBtn = document.querySelector(".submit");

libraryList.addEventListener("click", (e) => {
  const listItems = Array.from(libraryList.children);
  const bookRow = e.target.closest(".book-row");
  const bookIndex = listItems.indexOf(bookRow);

  if (e.target.classList.contains("read")) {
    readToggle(bookIndex);
  }
  if (e.target.classList.contains("remove")) {
    deleteBook(bookIndex);
  }
});

function deleteBook(bookIndex) {
  libraryArray.splice(bookIndex, 1);
  saveLocal();
  render();
}

let libraryArray = [];

addBtn.addEventListener("click", formShow);

document.body.addEventListener("click", formHide);

submitBtn.addEventListener("click", getBook);

// --------------------------------------------
//book object
class Book {
  constructor(name, pages, read, author) {
    this.name = name;
    this.pages = pages;
    this.read = read;
    this.author = author;
  }
}
// --------------------------------------------

function formShow(e) {
  entryBox.style.transform = "translateX(0)";
}

function formHide(e) {
  if (
    e.target != entryBox &&
    e.target != addBtn &&
    !entryBox.contains(e.target)
  ) {
    entryBox.style.transform = "translateX(100rem)";
  }
}

function getBook(e) {
  let inputs = entryBox.querySelectorAll("input");
  let nameEl = inputs[0].value;
  let pagesEl = parseInt(inputs[1].value);
  let readEl = inputs[2].checked;
  let authorEl = inputs[3].value;

  if (nameEl && pagesEl && authorEl) {
    e.preventDefault();

    const bookData = {
      name: nameEl,
      pages: pagesEl,
      read: readEl,
      author: authorEl,
    };

    let aBook = makeObj(bookData);
    pushToLibraryArray(aBook);
    inputs.forEach((input) => (input.value = ""));
    render();
  }
}

function makeObj(bookData) {
  let newBook = new Book(
    bookData.name,
    bookData.pages,
    bookData.read,
    bookData.author
  );
  return newBook;
}

function pushToLibraryArray(aBook) {
  libraryArray.push(aBook);
  saveLocal();
}

function readToggle(bookIndex) {
  console.log(libraryArray[bookIndex].read);
  libraryArray[bookIndex].read = !libraryArray[bookIndex].read;
  saveLocal();
  render();
}

function render() {
    const columnOrder = ["name", "pages", "read", "author"];
    libraryList.textContent = "";
    for (let index = 0; index < libraryArray.length; index++) {
      const book = libraryArray[index];
      const keyText = { read: book["read"] ? "complete" : "not complete" };

      let div = document.createElement("div");
      let delBtn = document.createElement("button");
      div.classList.add("book-row");
      columnOrder.forEach((key) => {
        const h3OrBtn =
          typeof book[key] === "boolean"
            ? document.createElement("button")
            : document.createElement("h3");
        h3OrBtn.textContent = keyText[key] || book[key];

        h3OrBtn.classList.add(key);
        div.appendChild(h3OrBtn);
      });
      div.appendChild(delBtn);
      delBtn.textContent = "delete";
      delBtn.classList.add("remove");

      libraryList.appendChild(div);
    }
  }
fetchLocal();
render();

function saveLocal() {
  localStorage.setItem("libraryArray", JSON.stringify(libraryArray));
}

function fetchLocal() {
  let data = JSON.parse(localStorage.getItem("libraryArray"));
    libraryArray = data ? data : [];

}
