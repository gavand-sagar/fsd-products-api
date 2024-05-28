import express from 'express'
import { getDb } from './utils/db-utils.js';
import { authentication } from './middleware/auth.js';
import jwt from 'jsonwebtoken'
import { globalConfig } from './config/global-config.js';
import { config } from 'dotenv';
config();

const app = express();

app.use(express.json());


app.get("/",(req,res)=>{
    res.send("App Working...")
})


app.get("/api/get-all-products", authentication, async (req, res) => {
    let db = await getDb();
    let products = await db.collection("products").find().toArray();
    res.json(products)
})


app.get("/api/get-all-orders", authentication, async (req, res) => {
    let db = await getDb();
    let orders = await db.collection("orders").find().toArray();
    res.json(orders)
})


app.get("/api/get-all-comments", authentication, async (req, res) => {
    let db = await getDb();
    let commnets = await db.collection("commnets").find().toArray();
    res.json(commnets)
})


app.post("/api/add-new-user", async (req, res) => {

    let newItem = req.body;
    let db = await getDb();
    let alreadyExisting = await db.collection("users").find({ username: newItem.username }).toArray();
    if (alreadyExisting && alreadyExisting.length > 0) {
        return res.json({
            message: "Username is already taken, try another username"
        })
    }
    await db.collection("users").insertOne(newItem)
    res.json({ message: "added" })
})



app.get('/api/login-and-generate-token', async (req, res) => {
    let db = await getDb();
    let alreadyExisting = await db.collection("users").find({ username: req.headers.username, password: req.headers.password }).toArray();

    if (alreadyExisting && alreadyExisting.length > 0) {

        let token = jwt.sign({ username: req.headers.username }, globalConfig.authKey, { expiresIn: globalConfig.expiresIn })

        return res.json({ token: token })
    } else {
        return res.json({ message: "unauthorized" })
    }
})


app.listen(3001, () => {
    console.log("Server Started....")
});



// GET - only reading
// POST - creating something new
// PUT/PATCH - updating
// DELETE - delete