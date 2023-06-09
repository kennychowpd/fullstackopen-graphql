import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../guery'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [selectedGenre, setSelectedGenre] = useState(null)

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>
      loading...
    </div>
  }

  const books = result.data.allBooks

  console.log(books)
  const genres = [...new Set(books.flatMap(book => book.genres))]
  console.log(genres)
  console.log(selectedGenre)
  const filteredBooks = books.filter(book => book.genres.includes(selectedGenre))
  console.log(filteredBooks)
  return (
    <div>
      <h2>books</h2>
      <div>
        <p>in genre patterns</p>
        {genres.map(genre =>
          <button onClick={() => setSelectedGenre(genre)}>{genre}</button>
        )}
        <button onClick={() => setSelectedGenre(null)}>All genres</button>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {!selectedGenre ?
            <>
              {books.map((book) => (
                <tr key={book.title}>
                  <td>{book.title}</td>
                  <td>{book.author.name}</td>
                  <td>{book.published}</td>
                </tr>
              ))}
            </>
            :
            <>
              {filteredBooks.map((book) => (
                <tr key={book.title}>
                  <td>{book.title}</td>
                  <td>{book.author.name}</td>
                  <td>{book.published}</td>
                </tr>
              ))}
            </>
          }

        </tbody>
      </table>
    </div >
  )
}

export default Books
