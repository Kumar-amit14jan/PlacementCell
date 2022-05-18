const env = require('./environment');
const mongoose = require('mongoose');
async function main(){
    await mongoose.connect(env.mongoose_path);
    console.log("connection Successfull !! ");
}
main().catch(error =>console.log("connection not successfull !!"));