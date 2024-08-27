import express from "express";
import {
    getAllBooks,
    createBook,
    updateBook,
    deleteBook,
} from "../controller/book.controller.js";
import { validateBook, validate } from "../middleware/validateRequest.js";

const router = express.Router();

router.get("/", getAllBooks);
router.post("/", validateBook(), validate, createBook);
router.patch("/:id", validateBook(true), validate, updateBook);
router.delete("/:id", deleteBook);

export default router;
