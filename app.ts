import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorHandler";
import customerRouter from "./routes/customerRoutes";
import itemRoutes from "./routes/itemRoutes";
import orderRoutes from "./routes/orderRoutes";
import adminRoutes from "./routes/adminRoutes";

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
const port = process.env.PORT;

app.use("/admin", adminRoutes);
app.use("/", customerRouter);
app.use("/item", itemRoutes);
app.use("/order", orderRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
