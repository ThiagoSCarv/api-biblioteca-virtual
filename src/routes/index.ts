import { Router } from "express";
import { authorsRoutes } from "./authors-routes";
import { booksRoutes } from "./books-routes";
import { bookLoansRoutes } from "./book-loans-routes";

const router = Router();
router.use("/authors", authorsRoutes)
router.use("/books", booksRoutes)
router.use("/book-loans", bookLoansRoutes)

export { router };
