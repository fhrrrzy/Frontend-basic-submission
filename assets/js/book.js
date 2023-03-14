const LOCAL_BOOK = "book_list" //localstorage key for booklist

/**
 * 
 * @returns json type of list of book data from local storage
 */
export const getBookFromLocal = () => {
    return JSON.parse(localStorage.getItem(LOCAL_BOOK))
}

/**
 * search book based on keyword match and their status (cuz we use tab stuff, so we kinda need to separate the search by status as well XD)
 * @param {String} word keyword for the search
 * @param {Boolean} isComplete book status 
 * @returns 
 */
export const searchBookFromLocal = (word, isComplete) => {
    const bookData = getBookFromLocal()
    const keyword = word.toLowerCase()
    const newBookData = bookData.filter(item => item.title.toLowerCase().startsWith(keyword) && item.isComplete == isComplete)
    return newBookData
}

/**
 * set new booklist object to the localstorage
 * @param {Object} data booklist to be updated to localstorage 
 */
export const setBookToLocal = (data) => {
    data = JSON.stringify(data)
    localStorage.setItem(LOCAL_BOOK, data)
}

/**
 * push new data onto old one then set to local
 * @param {Object} data new data to be pushed
 */
export const addBookToLocal = (data) => {
    const bookData = getBookFromLocal()
    bookData.push(data)
    setBookToLocal(bookData)
}

/**
 * make new booklist without book with deleted id
 * @param {Number} id id of book to be delete
 */
export const deleteBook = (id) => {
    const bookData = getBookFromLocal()
    const newBookData = bookData.filter(item => item.id != id)
    setBookToLocal(newBookData)
}

/**
 * getting booklist with specified status
 * @param {Boolean} isComplete is it unfinished or have read
 * @returns booklist with specific status
 */
export const getBookByStatus = (isComplete) => {
    const bookData = getBookFromLocal()
    const bookDataByStatus = bookData.filter(item => item.isComplete == isComplete)
    return bookDataByStatus
}

/**
 * change isComplete status from true to false and vice versa, then update it to localstorage
 * @param {Number} id the book id to be status change
 */
export const changeBookStatusById = (id) => {
    const bookData = getBookFromLocal()
    const updatedBook = bookData.map(item => {
        if(item.id == id){
            item.isComplete = !item.isComplete
        }
        return item
    })
    setBookToLocal(updatedBook)
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
export const bookElement = (id, title, author, year, isComplete) => {
    return `
    <li class="my-3">
        <div class="w-full rounded-xl p-5 flex justify-between bg-white shadow-sm relative">
            <div class="">
                <h2 class2="text-xl mb-1 text-slate-600">${title}</h2>
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
    <button data-id=${id} class="switch-button inline-block px-2 py-1 m-1 bg-white rounded-md duration-300 hover:shadow-lg border-indigo-400 border-[1px] group hover:bg-indigo-400 text-xs text-indigo-400 hover:text-white my-auto">
        Sudah Baca                                    
    </button>
    `
}

const unfinishedButtonElement = (id) => {
    return `
    <button data-id=${id} class="switch-button inline-block px-2 py-1 m-1 bg-white rounded-md duration-300 hover:shadow-lg border-indigo-400 border-[1px] group hover:bg-indigo-400 text-xs text-indigo-400 hover:text-white my-auto">
        Belum selesai baca                                    
    </button>
    `
}

export const notFoundElement = () => {
    return `
    <div class="my-24">
        <img src="assets/images/undraw_no_data_re_kwbl.svg" alt="no data img" class="w-44 mx-auto mb-2">
        <div class="text-xs text-center">Data buku tidak ditemukan </div>
    </div>
`
}