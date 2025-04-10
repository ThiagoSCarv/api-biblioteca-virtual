import { Router } from "express";
import { BooksController } from "@/controllers/books-controller";

const booksRoutes = Router();
const booksController = new BooksController();

booksRoutes.post("/", booksController.create);
booksRoutes.get("/", booksController.index);
booksRoutes.put("/:id", booksController.update);
booksRoutes.delete("/:id", booksController.remove);

export { booksRoutes };
