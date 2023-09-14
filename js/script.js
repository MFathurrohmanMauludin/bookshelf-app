document.addEventListener("DOMContentLoaded", function () {

    const submitForm = document.getElementById("form-input-data");
    submitForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // mengkonfirmasi apakah user ingin menyimpan data buku yang telah dimasukkan
        let conf_save = confirm("Apakah anda yakin ingin menyimpan data buku ini?");
        if (conf_save) {
            addBuku();
        } else {
            window.location.href;
        }
    });

    const submitSearch = document.getElementById("form-search-data");
    submitSearch.addEventListener("submit", function (event) {
        event.preventDefault();
        searchBook();
    });

    if (isStorageExist()) {
        loadDataFromStorage();
    }
});

// memberikan info data berhasil disimpan di console 
document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil disimpan.");
});

// refresh data 
document.addEventListener("ondataloaded", () => {
    refreshDataFromRak();
});

// menambahkan set 
const year = document.getElementById("year");
year.setAttribute("onKeyPress", "if(this.value.length==4) return false;");

// disable enter key
document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter' || e.code === 13) {
        e.preventDefault();
        return false;
    }

});