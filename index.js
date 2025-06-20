import express from "express"
import { adRouter } from "./routes/ad_route.js"
import {authRouter} from "./routes/auth_route.js";

import mongoose from "mongoose"
import 'dotenv/config'
import cors from "cors"
const app = express()


const PORT = 1010

app.use(express.json())
app.use('/api/v1', adRouter);
app.use('/api/v1/auth', authRouter);

app.use(cors())

const mongo_URI = process.env.MONGO_URI

await mongoose.connect(mongo_URI);


app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`)
}) 