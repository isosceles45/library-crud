import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

// Async thunks - CRUD
export const getBooks = createAsyncThunk('books/getBooks', async () => {
    const response = await axios.get(API_URL);
    return response.data;
});

export const createBook = createAsyncThunk('books/createBook', async (book) => {
    const response = await axios.post(API_URL, book);
    return response.data;
});

export const updateBook = createAsyncThunk('books/updateBook', async ({ id, updatedFields }) => {
    const response = await axios.put(`${API_URL}/${id}`, updatedFields);
    return response.data;
});


export const deleteBook = createAsyncThunk('books/deleteBook', async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
});

// Create a slice for books
const bookSlice = createSlice({
    name: 'books',
    initialState: {
        books: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBooks.pending, (state) => {
                state.loading = true;
            })
            .addCase(getBooks.fulfilled, (state, action) => {
                state.loading = false;
                state.books = action.payload;
            })
            .addCase(getBooks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createBook.pending, (state) => {
                state.loading = true;
            })
            .addCase(createBook.fulfilled, (state, action) => {
                state.loading = false;
                state.books.push(action.payload);
            })
            .addCase(createBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateBook.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateBook.fulfilled, (state, action) => {
                state.loading = false;
                state.books = state.books.map(book =>
                    book._id === action.payload._id ? action.payload : book
                );
            })
            .addCase(updateBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteBook.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteBook.fulfilled, (state, action) => {
                state.loading = false;
                state.books = state.books.filter(book => book._id !== action.payload);
            })
            .addCase(deleteBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default bookSlice.reducer;
