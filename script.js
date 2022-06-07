// mendapatkan semua seleksi element
const inputTodo = document.querySelector(".input-todo input");
const btnTambah = document.querySelector(".input-todo button");
const viewTodo = document.querySelector(".view-todo");
const hapusSemua = document.querySelector(".footer button");

// 1.
inputTodo.addEventListener('keyup', function () {
    let user = inputTodo.value; // mendapatkan todo inputan user
    if (user.trim() != 0) { // jika user tidak menginputkan value kosong
        btnTambah.classList.add("active"); // menambahkan class active
        inputTodo.classList.add("active");
    } else {
        btnTambah.classList.remove("active"); // menghapus class active
        inputTodo.classList.remove("active"); // menghapus class active
    }
})
tampilTodo()

// jika user mengklik button tambah
btnTambah.addEventListener('click', function () {
    let userData = inputTodo.value;
    let getLocalStorage = localStorage.getItem("New Todo"); // mendapatkan local storage
    if (getLocalStorage == null) { // jika localstorage == null
        listArry = []; // membuat array baru
    } else {
        listArry = JSON.parse(getLocalStorage); // mengubah json string ke js object
    }
    listArry.push(userData); // menambahkan data ke dalam array
    localStorage.setItem("New Todo", JSON.stringify(listArry)); // mengubah js object ke json string
    tampilTodo();
})

// function untuk menampilkan todo 
function tampilTodo() {
    let getLocalStorage = localStorage.getItem("New Todo"); // mendapatkan local storage
    if (getLocalStorage == null) { // jika localstorage == null
        listArry = []; // membuat array baru
    } else {
        listArry = JSON.parse(getLocalStorage); // mengubah json string ke js object
    }
    let newLiTag = ``;
    const nomerTodo = document.querySelector(".nomer-todo");
    nomerTodo.textContent = listArry.length; // menambahkan jumlah semua index todo ke class nomer todo
    listArry.forEach((element, index) => { // melakukan perulangan array
        // index = index + 1;
        newLiTag += `<li>${element} <span onclick="hapusTodo(${index})";><i class="fa-solid fa-trash"></i></span></li>`
    });
    viewTodo.innerHTML = newLiTag; // menambahkan todo yang dari local storage ke li di viewTodo 
    inputTodo.value = "";
}

// function untuk menghapus todo
function hapusTodo(index) {
    let getLocalStorage = localStorage.getItem("New Todo"); // mendapatkan local storage
    listArry = JSON.parse(getLocalStorage); // mengubah json string ke js object
    listArry.splice(index, 1); // hapus todo di element li, splice(index, hapus) => splice function untuk menghapus array
    localStorage.setItem("New Todo", JSON.stringify(listArry)); // mengubah js object ke json string
    tampilTodo();
}

// menghapus semua todolist
hapusSemua.addEventListener('click', function () {
    listArry = [];
    localStorage.setItem("New Todo", JSON.stringify(listArry)); // mengubah js object ke json string
    tampilTodo();
})

