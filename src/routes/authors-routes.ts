import { Router } from "express";
import { AuthorsController } from "@/controllers/authors-controller";

const authorsRoutes = Router();
const authorsController = new AuthorsController();

authorsRoutes.post("/", authorsController.create);
authorsRoutes.get("/", authorsController.index);
authorsRoutes.put("/:id", authorsController.update)
authorsRoutes.delete("/:id", authorsController.remove)

export { authorsRoutes };
