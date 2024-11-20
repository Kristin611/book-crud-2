import { Book } from "../App";
import BookItem from "./Book";

type Props = {
    books: Book[]
}

const Books = ({books}: Props) => {
return (
    <div className="books-container">
        {books.length > 0 ? (
        books.map((book) => (
          <BookItem key={book.id} book={book} />
        ))
      ) : (
        <div>No books available</div> // Handle case when no books are available
      )}
    </div>
    
)
}

export default Books;