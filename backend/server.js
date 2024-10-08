const app = require('./app')
const connectDatabase = require('./config/database')
const cloudinary = require('cloudinary');

const dotenv = require('dotenv')

//Handle Uncaught exceptions
process.on('uncaughtException',err => {
    console.log(`ERROR: ${err.stack}`)
    console.log('SHutting down due to uncaught exception')
    process.exit(1)
})


//setting up config file
dotenv.config({path:'backend/config/config.env'})


//Connect to database
connectDatabase()

// Setting up cloudinary configuration


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const server = app.listen(process.env.PORT,() => {
    console.log(`Server is running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
})

//Handele Unhandled prromise rejections
process.on('unhandledRejection',err => {
    console.log(`ERRO: ${err.message}`);
    console.log('Shutting down the server due to Unhandled Promise rejection')
    server.close(() => {
        process.exit(1);
    })  }) 
