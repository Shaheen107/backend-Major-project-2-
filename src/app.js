import express from "express"
const app = express();
import cors from "cors"
import cookieParser from "cookie-parser";

app.use(cors({
    origin: CORS_ORIGIN,
    credentials: true,
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))