const app = require("./app")

const dotenv = require("dotenv");
const { path } = require("./app");
const connectDatabase = require("./config/database")


//Handling Uncaught Exception

process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`);
    console.log(`Shutting down server due to uncaught error`)

    process.exit(1);
})



//Config
dotenv.config({path:"backend/config/config.env"});


//DataBase
connectDatabase();




const server = app.listen(process.env.PORT,()=>{
    console.log(`Server in wroking on http://localhost:${process.env.PORT}`);
});



//Unhandled Promise Rejection
process.on("unhandledRejection",err=>{
    console.log(`Error:${err.message}`);
    console.log("Shutting Down The Server Due to Unhandled Promise Rejection")

    server.close(()=>{
        process.exit(1)
    });

});

