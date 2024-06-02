import mongoose from "mongoose";

const url = process.env.MONGODB_URL;

module.exports = async () => {
    try {
        const conn = await mongoose.connect(url!);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        if (err instanceof Error) console.log(err.message);
        process.exit(1);
    }
};


