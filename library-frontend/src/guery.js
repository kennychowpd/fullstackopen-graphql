import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
  }
}
`

export const ALL_BOOKS = gql`
query AllBooks($genre:String){
  allBooks(genre: $genre) {
    title
    author {
      name
    }
    published
    genres
  }
}
`

export const CURRENT_USER = gql`
query {
  me {
    username
    favoriteGenre
  }
}
`

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!){
  addBook (
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title
    author {
      name
    }
    published
    genres
  }
}
`

export const EDIT_BIRTHYEAR = gql`
mutation editBirthYear($name: String!, $setBornTo: Int!){
  editAuthor (
    name: $name,
    setBornTo: $setBornTo
  ) {
    name
    born
    id
  }
}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
    author {
      bookCount
      born
      id
      name
    }
    genres
    id
    published
    title
  }
  }
`