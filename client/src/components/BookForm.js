import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBook, updateBook } from "../slices/bookSlice";

const BookForm = ({ currentId, setCurrentId }) => {
    const [bookData, setBookData] = useState({
        title: "",
        author: "",
        isbn: "",
        publishedYear: 2024,
        quantity: 0,
    });

    const dispatch = useDispatch();
    const books = useSelector((state) => state.books.books);
    const book = currentId ? books.find((book) => book._id === currentId) : null;

    useEffect(() => {
        if (book) setBookData(book);
    }, [book]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentId) {
            const originalBook = books.find((book) => book._id === currentId);

            // Calculate only changed fields
            const changedFields = {};
            for (const key in bookData) {
                if (bookData[key] !== originalBook[key]) {
                    changedFields[key] = bookData[key];
                }
            }
            console.log(changedFields);
            // Only dispatch update with changed fields
            dispatch(updateBook({ id: currentId, updatedFields: changedFields }));
        } else {
            dispatch(createBook(bookData));
        }

        clear();
    };

    const clear = () => {
        setCurrentId(null);
        setBookData({
            title: "",
            author: "",
            isbn: "",
            publishedYear: new Date().getFullYear(),
            quantity: 0,
        });
    };

    return (
        <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit}
        >
            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="title"
                >
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={bookData.title}
                    onChange={(e) =>
                        setBookData({ ...bookData, title: e.target.value })
                    }
                    required
                />
            </div>

            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="author"
                >
                    Author
                </label>
                <input
                    type="text"
                    id="author"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={bookData.author}
                    onChange={(e) =>
                        setBookData({ ...bookData, author: e.target.value })
                    }
                    required
                />
            </div>

            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="isbn"
                >
                    ISBN
                </label>
                <input
                    type="text"
                    id="isbn"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={bookData.isbn}
                    onChange={(e) =>
                        setBookData({ ...bookData, isbn: e.target.value })
                    }
                    required
                />
            </div>

            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="publishedYear"
                >
                    Published Year
                </label>
                <input
                    type="number"
                    id="publishedYear"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={bookData.publishedYear}
                    onChange={(e) =>
                        setBookData({
                            ...bookData,
                            publishedYear: parseInt(e.target.value, 10),
                        })
                    }
                    required
                />
            </div>

            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="quantity"
                >
                    Quantity
                </label>
                <input
                    type="number"
                    id="quantity"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={bookData.quantity}
                    onChange={(e) =>
                        setBookData({
                            ...bookData,
                            quantity: parseInt(e.target.value, 10),
                        })
                    }
                    required
                />
            </div>

            <div className="flex items-center justify-between">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    {currentId ? "Update Book" : "Add Book"}
                </button>
                <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={clear}
                >
                    Clear
                </button>
            </div>
        </form>
    );
};

export default BookForm;
