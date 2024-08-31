
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


getBookList()


















