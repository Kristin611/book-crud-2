import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import Books from './components/Books';
import BookForm from './components/BookForm'

export type Book = {
  id: number;
  title: string;
  author: string;
  genre: string;
  price: string;
}

function App() {
  const [books, setBooks] = useState<Book[]>([])

  useEffect(() => {
    axios.get("http://localhost:3000/book").then((response) => {
      const data = response.data;
      setBooks(data)
      // console.log(books);
    }).catch((error) => {
      console.log(error)
    })
  }, [])

  // const addBook = () => {
  //   console.log('Hi')
  // };

  return (
    <div>
      <h1>My Library</h1>
      <BookForm setBooks={setBooks} />
      <Books books={books} setBooks={setBooks}/>
    </div>
  )
}

export default App
