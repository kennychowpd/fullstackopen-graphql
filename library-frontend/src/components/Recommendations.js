import { useQuery } from '@apollo/client'
import { CURRENT_USER, ALL_BOOKS } from '../guery'

const Recommendations = (props) => {
  const currentUserQurey = useQuery(CURRENT_USER)
  const booksQuery = useQuery(ALL_BOOKS)
  
  if (!props.show) {
    return null
  }
  
  if (currentUserQurey.loading || booksQuery.loading) {
    return <div>
      loading...
    </div>
  }
  console.log(111,currentUserQurey)
  
  const selectedGenre = currentUserQurey.data.me.favoriteGenre
  const books = booksQuery.data.allBooks

  console.log(books)
  console.log(selectedGenre)
  const filteredBooks = books.filter(book => book.genres.includes(selectedGenre))
  console.log(filteredBooks)
  return (
    <div>
      <h2>books</h2>
      <div>
        <p>books in your favorite genre patterns</p>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div >
  )
}

export default Recommendations
