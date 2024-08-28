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
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">
                Library Dashboard
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <BookForm currentId={currentId} setCurrentId={setCurrentId} />
                <BookList setCurrentId={setCurrentId} />
            </div>
        </div>
    );
};

export default Dashboard;
