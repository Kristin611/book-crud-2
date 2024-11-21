import { Book } from "../App";
import BookItem from "./Book";

type Props = {
    books: Book[];
    setBooks: (books: Book[]) => void
;}

const Books = ({books, setBooks}: Props) => {
return (
    <div className="books-container">
        {books.length > 0 ? (
        books.map((book) => (
          <BookItem key={book.id} book={book} setBooks={setBooks}/>
        ))
      ) : (
        <div>No books available</div> // Handle case when no books are available
      )}
    </div>
    
)
}

export default Books;