const mongoose = require('mongoose');
require('dotenv').config();
mongoose.set('strictQuery', false);
try {
    
    async function main() {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        return conn;
    }
    const conn = main().then((conn) => {
        console.log("connected successfully");
        return conn.connection.getClient();
    });
} catch (err) {
    console.log(err);
}

