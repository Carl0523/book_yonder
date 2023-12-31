import express, {Request, Response} from "express";
import cors from "cors";
import "dotenv/config";

const app = express();

// Parse incoming json request and url-encoded data
app.use(express.json()); 
app.use(express.urlencoded({extended: true})); // 

// Allow cross origin resources sharing (cors)
app.use(cors());

// Server run on port 3000
app.listen(3000, () => {
    console.log("Server is running on port 3000");
})

