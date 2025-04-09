import { Router } from "express";
import { authorsRoutes } from "./authors-routes";

const router = Router();
router.use("/authors", authorsRoutes)

export { router };
