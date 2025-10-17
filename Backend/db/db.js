import mongoose from "mongoose";

async function connectToDB() {
    try {
        await mongoose.connect(process.env.DB_CONNECTION);
        console.log('connected to db');
    } catch (error) {
        console.log('Got error in db connection', error.message);
    }
}

export default connectToDB;