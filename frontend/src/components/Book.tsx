import { Book } from "../App";

type Props = {
    book: Book;
}

const BookItem = ({book}: Props) => {
    return (
        <div className="book-container">
            <div>{book.title}</div>
            <div>{book.author}</div>
            <div>{book.genre}</div>
            <div>{book.price}</div>
        </div>
        
    )
}

export default BookItem;