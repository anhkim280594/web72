const express = require("express") // commonjs
const dotenv = require("dotenv")
dotenv.config()
const app = express()
const PORT = 3007
const morgan = require("morgan")
const router = require("./routers")
const cors = require("cors")
const { logMiddleWare } = require("./middlewares")
const connectDb = require("./")
const fileUpload = require("express-fileupload")
app.use(morgan("combined"))
app.use(cors({ origin: "*" }))
app.use(fileUpload())
connectDb()
app.use(express.json())
app.use(logMiddleWare)
app.use(router)

app.listen(PORT, () => {
    console.log(`App is listening on http://localhost:${PORT}`)
})