const express =  require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const routes = require('./routes/todoRoute');

const app = express();
const PORT = process.env.PORT || 5500;

app.use(express.json());
app.use(cors());

// mongoDb Configuration
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}
connectDB();

app.use(routes);

// starting server
app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}`);
});