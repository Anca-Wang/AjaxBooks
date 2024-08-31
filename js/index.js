
const creator = 'Anca'

// Render the page to get the newest book list
function getBookList() {

  axios({
    url: 'http://hmajax.itheima.net/api/books',
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
    url: 'http://hmajax.itheima.net/api/books',
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
      url: `http://hmajax.itheima.net/api/books/${id}`,
      method: 'delete'
    }).then(() => {
      // Rerender the book list after deleting
      getBookList()
    })

  }

})






getBookList()


















