import * as book from './book.js'

/**
 * 
 * @returns boolean if the read tab is checked or not
 */
const isCompleteBook = () => {
    const radioRead = document.getElementById("read")
    return radioRead.checked == true
}
/**
 * display read or unread section based on radio tab
 */
const displaySection = () => {
    const searchValue = document.getElementById("search").value
    let data = []
    if (searchValue.length > 0) {
        data = book.searchBookFromLocal(searchValue, isCompleteBook())
    }
    else{
        data = book.getBookByStatus(isCompleteBook())
    }
    renderBookList(isCompleteBook(), data)
}



/**
 * delete and switch book status
 */
document.addEventListener("click", function(e){
    if(e.target.closest('.delete-button')){
        const id = e.target.closest('.delete-button').dataset.id
        book.deleteBook(id)
        addToast("success", "Buku berhasil dihapus!")
        displaySection()
    }
    if(e.target.closest('.switch-button')){
        const id = e.target.dataset.id
        book.changeBookStatusById(id)
        addToast("success", "Buku berhasil dipindahkan!")
        displaySection()
    }
})

/**
 * apply function on these event
 */
const tabOption = document.getElementsByName("status")
tabOption.forEach((item) => {
    item.addEventListener("change", displaySection)
})
document.addEventListener("DOMContentLoaded",displaySection)

/**
 * dismiss modal on modal dismiss clicked
 */
const modalDismiss = () => {
    const modal = document.getElementById("modal-backdrop")
    modal.style.display = "none"
}
const dismissModalButton = document.getElementById("dismiss-modal-button")
dismissModalButton.addEventListener("click", modalDismiss)

/**
 * show modal on add book floating action button clicked
 */
const modalShow = () => {
    const modal = document.getElementById("modal-backdrop")
    modal.style.display = "flex"
}
const showModalBUtton = document.getElementById("show-modal-button")
showModalBUtton.addEventListener("click", modalShow)


const search = document.getElementById("search")
search.addEventListener("keyup", ()=> {
    let keyword = search.value
    let data = book.searchBookFromLocal(keyword)
    displaySection(data)
})


const renderBookList = (isComplete, data) => {
    const bookList = document.getElementById("book-list")
    bookList.innerHTML = ''
    let listOfBooks = ``
    if(data.length > 0){
        data.forEach(item => {
            let id = item.id
            let title = item.title
            let author =  item.author
            let year = item.year
            let theBook = book.bookElement(id, title, author, year, isComplete)
            listOfBooks += theBook
        })
    }
    else{
        listOfBooks = book.notFoundElement()
    }
    bookList.innerHTML = listOfBooks
}

/**
 * 
 * @returns object of form add input values
 */
const getFormData = () => {
    const id = Date.now()
    const title = document.getElementById("judul").value
    const author = document.getElementById("penulis").value
    const year = document.getElementById("tahun").value
    const isComplete = document.getElementById("new-book-read").checked

    const data = {
        id : id,
        title : title,
        author : author,
        year : year,
        isComplete : isComplete
    }

    return data
}

const formAdd = document.getElementById("from-add")
formAdd.addEventListener("submit", (event) => {
    event.preventDefault()
    const data = getFormData()
    book.addBookToLocal(data)
    addToast("success", "Buku berhasil ditambahkan!")
    formAdd.reset()
    modalDismiss()
    displaySection()
})

const createEmptyList = () => {
    const data = []
    localStorage.setItem("book_list", JSON.stringify(data))
}

const isStorageSupported = () => {
    if(typeof(Storage) == undefined){
        addToast("warn", "Browser tidak support local storage!", 9999999)
    }
}

const addToast = (status, message, duration = 3000) => {
    const statusColor = (status == "warn") ? "bg-red-400" : "bg-green-400"
    const toastElement = `
      <li class="mb-1 animate-rightToLeft">
          <div class="px-5 py-3 ${statusColor} rounded-md shadow-lg w-60 text-sm">
              ${message}
          </div>
      </li>
    `;
    const toastList = document.getElementById("toast-list");
    toastList.insertAdjacentHTML("beforeend", toastElement);
    const toast = toastList.lastElementChild;
    setTimeout(() => {
        toast.remove();
    }, duration);
};

isStorageSupported()
if(!book.getBookFromLocal()){
    createEmptyList()
}