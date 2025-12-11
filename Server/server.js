const express = require("express")
const dotenv = require("dotenv")
const connectDB = require("./config/database.js")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const http = require("http")
const productRoutes = require("./route/productRoutes.js")

dotenv.config()

const app = express()
const port = process.env.SERVER_PORT

app.use(express.json())
app.use(cors)
app.use(cookieParser())

const server = http.createServer(app)

connectDB().then(() => {
    //   app.use("/categories", categoriesRoute)
    app.use("/products", productRoutes)

    server.listen(port, () => {
        console.log(`🚀 Server running at http://localhost:${port}`)
    })
})