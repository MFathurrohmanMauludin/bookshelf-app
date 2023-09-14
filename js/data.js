const STORAGE_KEY = "BOOKSHELF_APPS";

let buku = [];

// mengecek browser apakah mendukung web storage atau tidak
function isStorageExist() {
    if (typeof (Storage) === undefined) {
        alert("Browser kamu tidak mendukung local storage");
        return false
    }
    return true;
}


function saveData() {
    const parsed = JSON.stringify(buku);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}

// me-load data dari localstorage
function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);

    let data = JSON.parse(serializedData);

    if (data !== null)
        buku = data;

    document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage() {
    if (isStorageExist())
        saveData();
}

function composeBukuObject(image, title, author, year, isComplete) {
    return {
        id: +new Date(),
        image,
        title,
        author,
        year,
        isComplete
    };
}

function composeEditBukuObject(id, title, author, year, isComplete) {
    return {
        id,
        image,
        title,
        author,
        year,
        isComplete
    };
}

function findBuku(bukuId) {
    for (book of buku) {
        if (book.id === bukuId)
            return book;
    }
    return null;
}

function findBukuIndex(bukuId) {
    let index = 0
    for (book of buku) {
        if (book.id === bukuId)
            return index;
        index++;
    }

    return -1;
}

// menampilkan data dari web storage
function refreshDataFromRak() {
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_BUKU_ID);
    let listCompleted = document.getElementById(COMPLETED_LIST_BUKU_ID);

    for (book of buku) {
        const bukuBaru = makeBuku(book.image, book.title, book.author, book.year, book.isComplete);
        bukuBaru[BUKU_ITEMID] = book.id;

        if (book.isComplete) {
            listCompleted.append(bukuBaru);
        } else {
            listUncompleted.append(bukuBaru);
        }
    }
}

function CheckForStorage() {
    return typeof Storage !== 'undefined';
}

function GetBookList() {
    if (CheckForStorage) {
        return JSON.parse(localStorage.getItem(STORAGE_KEY));
    }
    return buku;
}
