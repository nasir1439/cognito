import express from "express";
import dotenv from "dotenv";
import connectdb from "./database/dbconnect.js";
import userRoute from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import courseRoute from "./routes/course.route.js";
import mediaRoute from "./routes/media.route.js";
import purchaseRoute from "./routes/purchaseRoute.route.js";
import courseProgressRoute from "./routes/courseProgress.route.js";

dotenv.config({});
// Database connect
connectdb();
const app = express();

const PORT = process.env.PORT || 3000;

//default middleware
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// apis
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/progress", courseProgressRoute);
app.use("/api/v1/media", mediaRoute);
app.get("/home", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to LMS API",
  });
});

app.listen(PORT, () => {
  console.log(`Server listen at port ${PORT}`);
});
