const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
    // throw new Error('Testing error handler');
    const products = await Product.find({ price : { $gte: 10 } })
        .sort('-createdAt')
        .select('name price')
        .limit(10);
    res.status(200).json({products, nBHits:products.length});
}

const getAllProducts = async (req, res) => {
    // console.log(req.query);
    const  { featured, company, name, sort, fields, numericFilters }  = req.query;
    // console.log({featured, company});
    const queryObject = {};
    if(featured){
        queryObject.featured = featured === 'true' ? true : false;
    }
    if(company){
        queryObject.company = company;
    }
    if(name){
        queryObject.name = { $regex: name, $options: 'i' };
    }
    if(numericFilters){
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte'
        };
        const regEx = /\b(<|>|=|>=|<=)\b/g;
        let filters = numericFilters.replace(
            regEx,(match) => 
            `-${operatorMap[match]}-`
            );
        // console.log(filters);
        const options = ['price','rating'];
        filters = filters.split(',').forEach((item) => {
            const [fields, operator, value] = item.split('-');
            if(options.includes(fields)){
                queryObject[fields] = {[operator] : Number(value)};
            }
        })
    }

    console.log(queryObject);
    let result = Product.find(queryObject);

    // Sort
    if (sort) {
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
    }
    else {
        result = result.sort('-createdAt');
    }

    // Fields
    if (fields) {
        const fieldsList = fields.split(',').join(' ');
        result = result.select(fieldsList);
    }
    else {
        result = result.select('-__v');
    }
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);



    const products = await result;
    // const products = await Product.find(req.query);
    res.status(200).json({products, nBHits:products.length});
}

module.exports = {
    getAllProductsStatic,
    getAllProducts
}