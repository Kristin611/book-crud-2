import axios from "axios";
import { Book } from "../App";
import { useState } from "react";

type Props = {
    book: Book;
    setBooks: (books: Book[]) => void;
}

const BookItem = ({book, setBooks}: Props) => {
    const [edit, setEdit] = useState(false);
    //could also set an entire object as your state so you don't have to set State for each value of author, genre, price, etc.
    const [title, setTitle] = useState(book.title);
    const [author, setAuthor] = useState(book.author);
    const [genre, setGenre] = useState(book.genre);
    const [price, setPrice] = useState(book.price);


    const deleteBook = () => {
        axios.delete(`http://localhost:3000/book/${book.id}`)
        .then((response) => {
            // console.log(response.data);
            setBooks(response.data);
        })
    };
    
    const editBook = () => {
        // console.log('edit book:', book);
        setEdit(!edit);

        if (edit) {
            if (
                title !== book.title ||
                author !== book.author ||
                genre !== book.genre ||
                price !== book.price
            ) {
            console.log('Send Request:')
            // console.log('Save book:', book.id, author, genre, price);
            axios.put(`http://localhost:3000/book/${book.id}`, {
                title,
                author,
                genre,
                price
            })
            .then((response) => {
            // console.log('Changed book data', response.data);
            setBooks(response.data);
        }) 
            } else {
                console.log('No changes!')
        }
        }
    };

    const editTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        setTitle(e.target.value);
    }

    const editAuthor = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        setAuthor(e.target.value);
    }

    const editGenre = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        setGenre(e.target.value);
    }

    const editPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        setPrice(e.target.value);
    }
    return (
        <div className="book-card">
            {edit ? <input value={title} onChange={editTitle}></input> : <div className='title'>{book.title}</div>}
            <div className='book-details'>
                <div className='detail-category'>Author: </div>
                {edit ? <input value={author} onChange={editAuthor}></input> : <div>{book.author}</div>}
            </div>
            <div className='book-details'>
                <div className='detail-category'>Genre: </div>
                {edit ? <input value={genre} onChange={editGenre}></input> : <div>{book.genre}</div>}
            </div>
            <div className='book-details'>
                <div className='detail-category'>Price: </div>
               {edit ? <input value={price} onChange={editPrice}></input> : <div>{book.price}</div>}
            </div>
            <button onClick={editBook}>{edit ? "Save" : "Edit"}</button>
            <button onClick={deleteBook}>Delete</button>
        </div>
        
    )
}

export default BookItem;