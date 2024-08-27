import { body, validationResult } from "express-validator";

export const validateBook = (isUpdate = false) => [
    body("title")
        .if(() => !isUpdate)
        .trim()
        .notEmpty()
        .withMessage("Title is required"),
    body("author")
        .if(() => !isUpdate)
        .trim()
        .notEmpty()
        .withMessage("Author is required"),
    body("isbn")
        .if(() => !isUpdate)
        .trim()
        .notEmpty()
        .withMessage("ISBN is required"),
    body("publishedYear")
        .optional()
        .isInt({ min: 1000, max: new Date().getFullYear() })
        .withMessage("Invalid published year"),
    body("quantity")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Quantity must be a non-negative integer"),
];

export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

    return res.status(422).json({
        errors: extractedErrors,
    });
};
