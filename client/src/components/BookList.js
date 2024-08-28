import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBook } from "../slices/bookSlice";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const BookList = ({ setCurrentId }) => {
    const dispatch = useDispatch();
    const books = useSelector((state) => state.books.books);

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-900 text-white border border-gray-700 rounded-lg shadow-lg">
                <thead>
                    <tr className="bg-gray-800 border-b border-gray-600">
                        <th className="px-6 py-3 text-left text-gray-300 font-semibold">
                            Title
                        </th>
                        <th className="px-6 py-3 text-left text-gray-300 font-semibold">
                            Author
                        </th>
                        <th className="px-6 py-3 text-left text-gray-300 font-semibold">
                            ISBN
                        </th>
                        <th className="px-6 py-3 text-left text-gray-300 font-semibold">
                            Published Year
                        </th>
                        <th className="px-6 py-3 text-left text-gray-300 font-semibold">
                            Quantity
                        </th>
                        <th className="px-6 py-3 text-left text-gray-300 font-semibold">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book._id} className="border-b border-gray-700">
                            <td className="px-6 py-4 text-gray-200">
                                {book.title}
                            </td>
                            <td className="px-6 py-4 text-gray-200">
                                {book.author}
                            </td>
                            <td className="px-6 py-4 text-gray-200">
                                {book.isbn}
                            </td>
                            <td className="px-6 py-4 text-gray-200">
                                {book.publishedYear}
                            </td>
                            <td className="px-6 py-4 text-gray-200">
                                {book.quantity}
                            </td>
                            <td className="px-6 py-4 flex space-x-2">
                                <button
                                    type="button"
                                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5"
                                    onClick={() => setCurrentId(book._id)}
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    type="button"
                                    className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center"
                                >
                                    <FaTrashAlt
                                        className=""
                                        onClick={() =>
                                            dispatch(deleteBook(book._id))
                                        }
                                    />
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
