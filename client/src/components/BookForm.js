import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBook, updateBook } from "../slices/bookSlice";
import { FaTrashAlt } from "react-icons/fa";

const BookForm = ({ currentId, setCurrentId }) => {
    const [bookData, setBookData] = useState({
        title: "",
        author: "",
        isbn: "",
        publishedYear: new Date().getFullYear(),
        quantity: 0,
    });

    const dispatch = useDispatch();
    const books = useSelector((state) => state.books.books);
    const book = currentId
        ? books.find((book) => book._id === currentId)
        : null;

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
            dispatch(
                updateBook({ id: currentId, updatedFields: changedFields })
            );
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
            className="bg-gray-900 text-white shadow-lg rounded-lg p-8 mb-6"
            onSubmit={handleSubmit}
        >
            <div className="mb-6">
                <label
                    className="block text-gray-300 text-sm font-semibold mb-2"
                    htmlFor="title"
                >
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    className="bg-gray-800 border border-gray-600 rounded-lg w-full py-2 px-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={bookData.title}
                    onChange={(e) =>
                        setBookData({ ...bookData, title: e.target.value })
                    }
                    required
                />
            </div>

            <div className="mb-6">
                <label
                    className="block text-gray-300 text-sm font-semibold mb-2"
                    htmlFor="author"
                >
                    Author
                </label>
                <input
                    type="text"
                    id="author"
                    className="bg-gray-800 border border-gray-600 rounded-lg w-full py-2 px-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={bookData.author}
                    onChange={(e) =>
                        setBookData({ ...bookData, author: e.target.value })
                    }
                    required
                />
            </div>

            <div className="mb-6">
                <label
                    className="block text-gray-300 text-sm font-semibold mb-2"
                    htmlFor="isbn"
                >
                    ISBN
                </label>
                <input
                    type="text"
                    id="isbn"
                    className="bg-gray-800 border border-gray-600 rounded-lg w-full py-2 px-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={bookData.isbn}
                    onChange={(e) =>
                        setBookData({ ...bookData, isbn: e.target.value })
                    }
                    required
                />
            </div>

            <div className="mb-6">
                <label
                    className="block text-gray-300 text-sm font-semibold mb-2"
                    htmlFor="publishedYear"
                >
                    Published Year
                </label>
                <input
                    type="number"
                    id="publishedYear"
                    className="bg-gray-800 border border-gray-600 rounded-lg w-full py-2 px-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

            <div className="mb-6">
                <label
                    className="block text-gray-300 text-sm font-semibold mb-2"
                    htmlFor="quantity"
                >
                    Quantity
                </label>
                <input
                    type="number"
                    id="quantity"
                    className="bg-gray-800 border border-gray-600 rounded-lg w-full py-2 px-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    type="submit"
                    className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                    {currentId ? "Update Book" : "Add Book"}
                </button>
                <button
                    type="button"
                    className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center"
                    onClick={clear}
                >
                    <FaTrashAlt />
                </button>
            </div>
        </form>
    );
};

export default BookForm;
