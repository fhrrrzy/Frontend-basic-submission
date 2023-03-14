/**
 * display read or unread section based on radio tab
 */
const displaySection = () => {
    const radioRead = document.getElementById("read")
    const readSection = document.getElementById("read-section")

    const radioUnread = document.getElementById("unread")
    const unreadSection = document.getElementById("unread-section")

    if(radioRead.checked == true){
        readSection.style.display = "block"
        unreadSection.style.display = "none"
    }
    else{
        readSection.style.display = "none"
        unreadSection.style.display = "block"
    }
}

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

    const payload = {
        id : id,
        title : title,
        author : author,
        year : year,
        isComplete : isComplete
    }

    return payload
}

/**
 * 
 * @returns search value from search input form 
 */
const getSearchInput = () => {
    const searchValue = document.getElementById("search").value
    return searchValue
}

/**
 * 
 * @returns boolean if the storage feature is supported, if not it will show alert as well
 */
const isStorageSupported = () => {
    if(typeof(Storage) == undefined){
        alert("Storage not supported")
        return false
    }
    return true
}

/**
 * 
 * @param {Number} id the id of the book 
 * @param {String} title the title of the book
 * @param {String} author the author of the book
 * @param {Number} year released year of the book
 * @param {Boolean} isComplete Book status wether its completed or not (unfinished)
 * @returns 
 */
const bookElement = (id, title, author, year, isComplete) => {
    return `
    <li class="my-3">
        <div class="w-full rounded-xl p-5 flex justify-between bg-white shadow-sm relative">
            <div class="">
                <h2 class="text-lg text-slate-600">${title}</h2>
                <div class="text-slate-500 text-xs">${author} - ${year}</div>
            </div>
            <div class="my-auto">
                ${isComplete ? unfinishedButtonElement(id) : finishedButtonElement(id)}
            </div>
            <button data-id=${id} class="delete-button absolute -top-2 -right-2 p-1 rounded-full duration-300 hover:shadow-lg border-red-400 hover:bg-red-500 border-[1px] group bg-red-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 group-hover:stroke-white duration-300 stroke-white">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>                            
            </button>
        </div>
    </li>
    `
}
const finishedButtonElement = (id) => {
    return `
    <button data-id=${id} class="finish-button inline-block px-2 py-1 m-1 bg-white rounded-md duration-300 hover:shadow-lg border-indigo-400 border-[1px] group hover:bg-indigo-400 text-xs text-indigo-400 hover:text-white my-auto">
        Sudah Baca                                    
    </button>
    `
}
const unfinishedButtonElement = (id) => {
    return `
    <button data-id=${id} class="unfinish-button inline-block px-2 py-1 m-1 bg-white rounded-md duration-300 hover:shadow-lg border-indigo-400 border-[1px] group hover:bg-indigo-400 text-xs text-indigo-400 hover:text-white my-auto">
        Belum selesai baca                                    
    </button>
    `
}

/**
 * 
 * @returns json parsed from local storage json string
 */
const getBookFromLocal = () => {
    return JSON.parse(localStorage.getItem('book-list'))
}

const searchBookFromLocal = (word) => {
    const bookData = getBookFromLocal
    const keyword = word.toLowerCase()
    const newBookData = bookData.filter(item => item.title.toLowerCase().startsWith(keyword))
    return newBookData
}

const setBookToLocal = (data) => {
    data = JSON.stringify(data)
    localStorage.setItem('book-list', data)
}

const addBookToLocal = (data) => {
    const bookData = getBookFromLocal
    const newBookData = [...bookData, ...data]
    setBookToLocal(newBookData)
}

const deleteBook = (id) => {
    const bookData = getBookFromLocal
    const newBookData = bookData.filter(item => item.id != id)
    setBookToLocal(newBookData)
}

const getBookByStatus = (isComplete) => {
    const bookData = getBookFromLocal
    const bookDataByStatus = bookData.filter(item => item.isComplete == isComplete)
    return bookDataByStatus
}


const renderBookByStatus = (isComplete) => {
    const idSection = isComplete ? "read-section" : "unread-section"
    const section = document.getElementById(idSection)
    const data = getBookByStatus(isComplete)
    let listOfBooks = ``
    data.forEach(item => {
        let id = item.id
        let title = item.title
        let author =  item.author
        let year = item.year
        let theBook = bookElement(id, title, author, year, isComplete)
        listOfBooks += theBook
    })
    section.innerHTML = listOfBooks
}