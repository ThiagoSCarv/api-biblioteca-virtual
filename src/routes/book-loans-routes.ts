import { Router } from "express";
import { BookLoansControllers } from "@/controllers/book-loans-controller";

const bookLoansRoutes = Router();
const bookLoansControllers = new BookLoansControllers();

bookLoansRoutes.post("/", bookLoansControllers.create);
bookLoansRoutes.get("/", bookLoansControllers.index);
bookLoansRoutes.put("/:id", bookLoansControllers.update);
bookLoansRoutes.delete("/:id", bookLoansControllers.remove);

export { bookLoansRoutes };
