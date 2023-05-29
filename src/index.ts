import express, { Express } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { router as shortlink } from "./routes/shortLinkRouter";
import useragent from "express-useragent";
import cors from "cors";


dotenv.config()

const app: Express = express();

app.use(cors());
app.use(useragent.express())

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

main().catch((err) => console.log(err));

async function main() {
    await mongoose.connect(
        // "mongodb://127.0.0.1:27017/test_appgain"
        (process.env.DB_URI as string)
    );
    console.log("***Connected to database***");
}


app.use("/shortlinks", shortlink)

const port = 8080;

app.listen(port, () => {
    console.log(`listening to ${port}`);
});