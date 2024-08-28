import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import BookForm from "../components/BookForm";
import BookList from "../components/BookList";
import { getBooks } from "../slices/bookSlice";

const Dashboard = () => {
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBooks());
    }, [dispatch]);

    return (
        <div className="bg-gray-900 min-h-screen p-6">
            <div class="flex justify-center">
                <h1 class="text-5xl mb-6 font-bold dark:text-white">Library Dashboard</h1>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 bg-gray-800 p-6 rounded-lg shadow-lg">
                    <BookForm
                        currentId={currentId}
                        setCurrentId={setCurrentId}
                    />
                </div>
                <div className="lg:col-span-2 bg-gray-800 p-6 rounded-lg shadow-lg">
                    <BookList setCurrentId={setCurrentId} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
