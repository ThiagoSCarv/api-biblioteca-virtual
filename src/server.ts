import express from "express";
import { errorHandling } from "./middlewares/error-handling";
import { router } from "./routes";

const PORT = 3333;
const app = express();

app.use(express.json());
app.use(router)

app.use(errorHandling);

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
