import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./routes/routes";

dotenv.config();

const app = express();

app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());
app.use(express.json())
app.use(router);

const port = process.env.PORT_APP || 5001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
