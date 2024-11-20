import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import Books from './components/Books';

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

  return (
    <div>
      <h1>My Library</h1>
      <Books books={books} />
    </div>
  )
}

export default App
