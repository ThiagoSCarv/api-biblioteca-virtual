import { Router } from "express";
import { authorsRoutes } from "./authors-routes";
import { booksRoutes } from "./books-routes";

const router = Router();
router.use("/authors", authorsRoutes)
router.use("/books", booksRoutes)

export { router };
