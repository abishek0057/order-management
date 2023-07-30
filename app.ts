import express from "express";
import dotenv from "dotenv";
import errorHandler from "./middleware/errorHandler";
import customerRouter from "./routes/customerRoutes";
import itemRoutes from "./routes/itemRoutes";
import orderRoutes from "./routes/orderRoutes";
import adminRoutes from "./routes/adminRoutes";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT;

app.use("/admin", adminRoutes);
app.use("/", customerRouter);
app.use("/item", itemRoutes);
app.use("/order", orderRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
