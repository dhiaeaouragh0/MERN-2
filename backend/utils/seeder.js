const Product = require('../models/product');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');

const products = require('../data/products.json');
const { connect } = require('mongoose');

//setting dorenv file

dotenv.config({path:'backend/config/config.env'});

connectDatabase();

//seeding products

const seedProducts = async () => {
    try {
        await Product.deleteMany();
        console.log('All products have been deleted');

        await Product.insertMany(products);
        console.log('All products have been inserted');

        process.exit();

    } catch (error) {
        console.log(error.message);
        process.exit();
    }
};

seedProducts();