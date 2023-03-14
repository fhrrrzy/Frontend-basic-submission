const LOCAL_BOOK = "book_list"

export const getBookFromLocal = () => {
    return JSON.parse(localStorage.getItem(LOCAL_BOOK))
}

export const searchBookFromLocal = (word) => {
    const bookData = getBookFromLocal()
    const keyword = word.toLowerCase()
    const newBookData = bookData.filter(item => item.title.toLowerCase().startsWith(keyword))
    return newBookData
}

export const setBookToLocal = (data) => {
    data = JSON.stringify(data)
    localStorage.setItem(LOCAL_BOOK, data)
}

export const addBookToLocal = (data) => {
    const bookData = getBookFromLocal()
    bookData.push(data)
    setBookToLocal(bookData)
}

export const deleteBook = (id) => {
    const bookData = getBookFromLocal()
    const newBookData = bookData.filter(item => item.id != id)
    setBookToLocal(newBookData)
}

export const getBookByStatus = (isComplete) => {
    const bookData = getBookFromLocal()
    const bookDataByStatus = bookData.filter(item => item.isComplete == isComplete)
    return bookDataByStatus
}

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