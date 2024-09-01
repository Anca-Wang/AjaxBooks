
const creator = 'Anca'

// Render the page to get the newest book list
function getBookList() {

  axios({
    url: 'https://hmajax.itheima.net/api/books',
    params: {
      creator
    }
  }).then(result => {

    // Get all book items
    const bookItem = result.data.data.map((item, index) => {

      // Return a new array 
      return `<tr>
        <td>${index + 1}</td>
        <td>${item.bookname}</td>
        <td>${item.author}</td>
        <td>${item.publisher}</td>
        <td data-id="${item.id}">
          <span class="del">Delete</span>
          <span class="edit">Edit</span>
        </td>
      </tr>`
    }).join('')

    document.querySelector('.list').innerHTML = bookItem

  })

}


// Add event

const addModal = document.querySelector('.add-modal')
const add = new bootstrap.Modal(addModal)

document.querySelector('.add-btn').addEventListener('click', () => {

  // Get newly added book item object
  const addForm = document.querySelector('.add-form')
  const bookItem = serialize(addForm, { hash: true, empty: true })

  axios({
    url: 'https://hmajax.itheima.net/api/books',
    method: 'post',
    data: {
      ...bookItem,
      creator
    }
  }).then(result => {

    getBookList()

    addForm.reset()

    add.hide()

  })

})


// Delete Event
// Select table body with the classname of list
const list = document.querySelector('.list')

list.addEventListener('click', e => {

  // If the pressed key contains a del class name
  if (e.target.classList.contains('del')) {

    // Get the id of the deleted item
    const id = e.target.parentNode.dataset.id

    // Started axios
    axios({
      // delete the item with the selected id's url
      url: `https://hmajax.itheima.net/api/books/${id}`,
      method: 'delete'
    }).then(() => {
      // Rerender the book list after deleting
      getBookList()
    })

  }

})


// Edit Event 
const editDom = document.querySelector('.edit-modal')
const editModal = new bootstrap.Modal(editDom)

// If clicked the edit btn
document.querySelector('.list').addEventListener('click', (e) => {

  if (e.target.classList.contains('edit')) {

    const id = e.target.parentNode.dataset.id

    // Get the current clicked book info from server using the same id
    axios({
      url: `https://hmajax.itheima.net/api/books/${id}`
    }).then(result => {

      // Method 1: Fill in all values to the input boxes
      // document.querySelector('.edit-form .bookname').value = result.data.data.bookname
      // document.querySelector('.edit-form .author').value = result.data.data.author
      // document.querySelector('.edit-form .publisher').value = result.data.data.publisher

      // Method 2: Loop through the bookObj object and fill in all values 
      const bookObj = result.data.data
      const keys = Object.keys(bookObj)
      // console.log(keys), return ["id", "bookname", "author", "publisher" ]

      keys.forEach((key) => {
        document.querySelector(`.edit-form .${key}`).value = bookObj[key]
      })

      // Display the edit modal box
      editModal.show()
    })

  }

})

// If clicked the save button inside the edit form
document.querySelector('.edit-btn').addEventListener('click', (e) => {

  // const id = e.target.parentNode.dataset.id
  const editForm = document.querySelector('.edit-form')
  const { id, bookname, author, publisher } = serialize(editForm, { hash: true, empty: true })

  axios({
    url: `https://hmajax.itheima.net/api/books/${id}`,
    method: 'put',
    data: {
      bookname,
      author,
      publisher,
      creator
    }

  }).then(result => {
    getBookList()
  })
  editModal.hide()
})

getBookList()


















