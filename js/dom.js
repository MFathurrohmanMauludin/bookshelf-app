const UNCOMPLETED_LIST_BUKU_ID = "buku";
const COMPLETED_LIST_BUKU_ID = "completed-buku";
const BUKU_ITEMID = "itemId";

// menambahkan buku di rak 
function makeBuku(image, title, author, year, isComplete) {

    const imageBuku = document.createElement("img");
    imageBuku.setAttribute("id", "url-image");
    imageBuku.setAttribute("src", image);
    imageBuku.setAttribute("width", "200");
    imageBuku.setAttribute("height", "300");

    const textTitle = document.createElement("h2");
    textTitle.innerText = title;

    const textAuthor = document.createElement("p");
    textAuthor.innerText = author;

    const textYear = document.createElement("small");
    textYear.innerText = year;

    const textContainer = document.createElement("div");
    textContainer.classList.add("inner");

    textContainer.append(textTitle, textAuthor, textYear);

    const container = document.createElement("div");
    container.setAttribute("id", "book-item");
    container.classList.add("item", "shadow");
    container.append(imageBuku, textContainer);

    if (isComplete) {
        container.append(
            createKembaliButton(),
            createHapusButton()
        );
    } else {
        container.append(
            createCheckButton(),
            editBukuButton(),
            createHapusButton()
        );
    }

    return container;
}

// mengedit buku
function editBukuButton() {
    return createButton("edit-button", function (event) {
        editBuku(event.target.parentElement);
    });
}

// kembalikan buku
function createKembaliButton() {
    return createButton("undo-button", function (event) {
        undoBukuFromRakSelesaiBaca(event.target.parentElement);
    });
}

// hapus buku
function createHapusButton() {
    return createButton("trash-button", function (event) {
        removeBuku(event.target.parentElement);
    });
}

// checklist buku
function createCheckButton() {
    return createButton("check-button", function (event) {
        addBukuToCompleted(event.target.parentElement);
    });
}

// function untuk membuat button
function createButton(buttonTypeClass, eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function (event) {
        eventListener(event);
    });
    return button;
}

// mengembalikan buku ke rak belum selesai baca
function addBuku() {
    const uncompletedBukuList = document.getElementById(UNCOMPLETED_LIST_BUKU_ID);
    const image = document.getElementById("image").value;
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const year = document.getElementById("year").value;
    const book = makeBuku(image, title, author, year, false);
    const bukuObject = composeBukuObject(image, title, author, year, false);
    const btnSubmit = document.getElementById("submit");

    book[BUKU_ITEMID] = bukuObject.id;

    btnSubmit.setAttribute("name", bukuObject.id);
    buku.push(bukuObject);

    uncompletedBukuList.append(book);
    updateDataToStorage();
}

// menambahkan buku ke rak sudah selesai baca
function addBukuToCompleted(bukuElement) {
    const listBukuCompleted = document.getElementById(COMPLETED_LIST_BUKU_ID);
    const url = bukuElement.querySelector("#url-image").getAttribute("src");
    const image = document.getElementById("image").src = url;
    const title = bukuElement.querySelector(".inner > h2").innerText;
    const author = bukuElement.querySelector(".inner > p").innerText;
    const year = bukuElement.querySelector(".inner > small").innerText;

    const bukuBaru = makeBuku(image, title, author, year, true);

    const book = findBuku(bukuElement[BUKU_ITEMID]);
    book.isComplete = true;
    bukuBaru[BUKU_ITEMID] = book.id;

    listBukuCompleted.append(bukuBaru);
    bukuElement.remove();

    updateDataToStorage();
}

// menghapus buku dari rak belum selesai dibaca maupun rak selesai dibaca
function removeBuku(bukuElement) {
    const bukuPosition = findBukuIndex(bukuElement[BUKU_ITEMID]);
    buku.splice(bukuPosition, 1);

    var conf_delete = confirm("Apakah anda ingin menghapus buku ini?");
    if (conf_delete) {
        bukuElement.remove();
    } else {
        window.location.href;
    }

    updateDataToStorage();
}

// mengembalikan buku dari rak selesai dibaca ke rak belum selesai dibaca
function undoBukuFromRakSelesaiBaca(bukuElement) {
    const listBukuUncompleted = document.getElementById(UNCOMPLETED_LIST_BUKU_ID);
    const url = bukuElement.querySelector("#url-image").getAttribute("src");
    const image = document.getElementById("image").src = url;
    const title = bukuElement.querySelector(".inner > h2").innerText;
    const author = bukuElement.querySelector(".inner > p").innerText;
    const year = bukuElement.querySelector(".inner > small").innerText;

    const bukuBaru = makeBuku(image, title, author, year, false);
    const book = findBuku(bukuElement[BUKU_ITEMID]);
    book.isComplete = false;
    bukuBaru[BUKU_ITEMID] = book.id;


    listBukuUncompleted.append(bukuBaru);
    bukuElement.remove();

    updateDataToStorage();
}

// update data setelah click btn update
document.getElementById("update").addEventListener("click", (event) => {
    event.preventDefault;

    const id = document.querySelector('#update');
    const bookId = id.getAttribute("data-id");

    const btnUpdate = document.getElementById("update");
    btnUpdate.setAttribute("hidden", "");

    const btnSubmit = document.getElementById("submit");
    btnSubmit.removeAttribute("hidden");

    const image = document.getElementById("image").value;
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const year = document.getElementById("year").value;
    const isComplete = false;
    const bookData = GetBookList();

    for (let i = 0; i < bookData.length; i++) {
        if (bookData[i].id == bookId) {
            bookData[i].id = bookId;
            bookData[i].image = image;
            bookData[i].title = title;
            bookData[i].author = author;
            bookData[i].year = year;
            bookData[i].isComplete = isComplete;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(bookData));
        }
    }

    // refresh buku
    let conf_update = confirm("Apakah anda yakin ingin menyimpan perubahan data buku ini?");
    if (conf_update) {
        window.location.reload(true);
    } else {
        window.location.href;
    }

    document.getElementById('form').reset();
});

// cancel update
document.getElementById("cancel").addEventListener("click", () => {
    const btnSubmit = document.getElementById("submit");
    btnSubmit.removeAttribute("hidden", "");

    const btnUpdate = document.getElementById("update");
    btnUpdate.setAttribute("hidden", "");

    const btnCancel = document.getElementById("cancel");
    btnCancel.setAttribute("hidden", "");

    document.getElementById('form').reset();
});

// mengedit informasi buku
function editBuku(bukuElement) {
    const book = findBuku(bukuElement[BUKU_ITEMID]);

    const btnSubmit = document.getElementById("submit");
    btnSubmit.setAttribute("hidden", "");

    const btnUpdate = document.getElementById("update");
    btnUpdate.removeAttribute("hidden");

    const btnCancel = document.getElementById("cancel");
    btnCancel.removeAttribute("hidden");

    btnUpdate.setAttribute("data-id", book.id);
    document.getElementById("image").value = book.image;
    document.getElementById("title").value = book.title;
    document.getElementById("author").value = book.author;
    document.getElementById("year").value = book.year;
}


// pencarian buku
function searchBook() {
    const searchValue = document.getElementById('book-title').value;
    const isCompletedBook = document.getElementById(COMPLETED_LIST_BUKU_ID);
    const unCompletedBook = document.getElementById(UNCOMPLETED_LIST_BUKU_ID);

    const bookAll = document.querySelectorAll('#book-item');

    if (searchValue !== null) {
        for (const bookItem of bookAll) {
            bookItem.remove();
        }

        const filterBooks = buku.filter((book) => book.title.toLowerCase().includes(searchValue.toLowerCase()))

        for (const result of filterBooks) {
            const getBook = makeBuku(result.image, result.title, result.author, result.year, result.isComplete);

            getBook[BUKU_ITEMID] = result.id;

            if (result.isComplete) {
                isCompletedBook.append(getBook);
            } else {
                unCompletedBook.append(getBook);
            }
        }
    } else {
        for (const result of filterBooks) {
            result.remove();
        }
        loadDataFromStorage();
    }
    return buku;
}

