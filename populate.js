require('dotenv').config();

const connectDB = require('./db/connect');
const Product = require('./models/product');

const jsonProducts = require('./products.json');

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URI);
        await Product.deleteMany();
        await Product.insertMany(jsonProducts);
        // const products = await Product.find();
        // console.log(products);
        console.log('Data populated');
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(0);
    }
}

start();