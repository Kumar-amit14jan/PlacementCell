const mongoose = require('mongoose');
async function main(){
    await mongoose.connect('mongodb://localhost:27017/placementcell');
    console.log("connection Successfull !! ");
}
main().catch(error =>console.log("connection not successfull !!"));