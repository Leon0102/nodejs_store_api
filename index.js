require('dotenv').config();
require('express-async-errors');

const morgan = require('morgan');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const connectDB = require('./db/connect');
const productsRouter = require('./routes/products');

const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(morgan('combined'));

// Middleware
app.use(express.json());


// routes
app.get('/', (req, res) => {
    res.send('<h1>Stored-API</h1><a href="/api/v1/products"> products route</a>');
})

app.use('/api/v1/products',productsRouter);


// products routes
app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async (req, res) => {
    try{
        await connectDB(process.env.MONGODB_URI);
        app.listen(port, () => {
            console.log(`Example app listening at http://localhost:${port}`)
        })
    }
    catch(err){
        console.log(err);
    }
}
start();
