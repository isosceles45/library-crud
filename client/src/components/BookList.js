import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBook } from "../slices/bookSlice";

const BookList = ({ setCurrentId }) => {
    const dispatch = useDispatch();
    const books = useSelector((state) => state.books.books);

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                <thead>
                    <tr className="bg-gray-100 border-b border-gray-300">
                        <th className="px-6 py-3 text-left text-gray-600 font-semibold">
                            Title
                        </th>
                        <th className="px-6 py-3 text-left text-gray-600 font-semibold">
                            Author
                        </th>
                        <th className="px-6 py-3 text-left text-gray-600 font-semibold">
                            ISBN
                        </th>
                        <th className="px-6 py-3 text-left text-gray-600 font-semibold">
                            Published Year
                        </th>
                        <th className="px-6 py-3 text-left text-gray-600 font-semibold">
                            Quantity
                        </th>
                        <th className="px-6 py-3 text-left text-gray-600 font-semibold">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book._id} className="border-b border-gray-200">
                            <td className="px-6 py-4 text-gray-700">{book.title}</td>
                            <td className="px-6 py-4 text-gray-700">{book.author}</td>
                            <td className="px-6 py-4 text-gray-700">{book.isbn}</td>
                            <td className="px-6 py-4 text-gray-700">{book.publishedYear}</td>
                            <td className="px-6 py-4 text-gray-700">{book.quantity}</td>
                            <td className="px-6 py-4 flex space-x-2">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded"
                                    onClick={() => setCurrentId(book._id)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded"
                                    onClick={() => dispatch(deleteBook(book._id))}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookList;
