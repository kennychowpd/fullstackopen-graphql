import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, EDIT_BIRTHYEAR } from '../guery'
import { useState } from 'react'




const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const result = useQuery(ALL_AUTHORS)
  const [editBirthYear] = useMutation(EDIT_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]
  })

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>
      loading...
    </div>
  }

  const authors = result.data.allAuthors


  const submit = async (event) => {
    event.preventDefault()
    console.log(name, born)

    await editBirthYear({variables: {name: name, setBornTo: born}})

    setName('')
    setBorn('')
  }
  

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          name<input type='text' value={name} onChange={(e) => setName(e.target.value)}></input>
        </div>
        <div>
          born<input type='number' value={born} onChange={(e) => setBorn(parseInt(e.target.value))}></input>
        </div>
        <button type='submit'>
          update author
        </button>
      </form>
    </div>
  )
}

export default Authors
