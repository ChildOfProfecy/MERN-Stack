const app = require("./app")

const dotenv = require("dotenv");
// const { path } = require("./app");


dotenv.config({path:"backend/config/config.env"})
app.listen(process.env.PORT,()=>{
    console.log(`Server in wroking on http://localhost:${process.env.PORT}`);
});

