import express from "express";
import dotenv from "dotenv";
import errorHandler from "./middleware/errorHandler";
import customerRouter from "./routes/customerRoutes";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT;

app.use("/", customerRouter);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
