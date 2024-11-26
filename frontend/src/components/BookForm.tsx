import axios from "axios";
import { useState } from "react";
import { Book } from "../App";

type Props = {
    setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
}

const BookForm = ({ setBooks }: Props) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [genre, setGenre] = useState("");
    const [price, setPrice] = useState("");
    const [error, setError] = useState("");

    const submitBook = () => {
        // console.log('edit book:', book);
        // setEdit(!edit);

            if (
                title !== "" &&
                author !== "" &&
                genre !== "" &&
                price !== ""
            ) {
            // console.log('Send Request:')
            // console.log('Save book:', book.id, author, genre, price);
            axios.post("http://localhost:3000/book", {
                title,
                author,
                genre,
                price
            })
            .then((response) => {
            // console.log('Added book data', response.data);
            setBooks(response.data);
            setTitle("");
            setAuthor("");
            setGenre("");
            setPrice("");
        })
        .catch((error) => {
            // catch an error from the API
            console.log('This is an error', error);
            setError(error.nessage);
        })  
            } else {
                // catch any user input issues before sending to the api 
                // console.log('Missing Info');
                let errorMessage = "";

                if (title === "") {
                    errorMessage += "title";
                }
                if (author === "") {
                    errorMessage += " author"
                }
                if (genre === "") {
                    errorMessage += " genre"
                }
                if (price === "") {
                    errorMessage += " price"
                }

                setError(`All fields are required: ${errorMessage}`);
        }
        
    };


    const addTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.value);
        setTitle(e.target.value);
        setError('');
    }

    const addAuthor = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.value);
        setAuthor(e.target.value);
        setError('');
    }

    const addGenre = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.value);
        setGenre(e.target.value);
        setError('');
    }

    const addPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.value);
        setPrice(e.target.value);
        setError('');
    }

    return (
    <div>
        {error ? <div className='mb-20 error'>{error}</div> : null}
        <div className="book-card mb-20">
            <div className="title">Add a Book to Your Library:</div>
            <div className="book-details">
                <div className="detail-category">Title:</div>
                <input value={title} onChange={addTitle}></input>
            </div>
            <div className="book-details">
                <div className="detail-category">Author:</div>
                <input value={author} onChange={addAuthor}></input>
            </div>
            <div className="book-details">
                <div className="detail-category">Genre:</div>
                <input value={genre} onChange={addGenre}></input>
            </div>
            <div className="book-details">
                <div className="detail-category">Price:</div>
                <input value={price} onChange={addPrice}></input>
            </div>
            <button onClick={submitBook}>Add Book</button>
        </div>
    </div>    
    )
}

export default BookForm;