const mongoose = require('mongoose')
async function conn() {
    try {
        const url = "mongodb+srv://phandinhphuoc02:dadZprcUWLzCWqiZ@cluster0.u4fxy74.mongodb.net/Moto?retryWrites=true&w=majority&appName=Cluster0"
        await mongoose.connect("mongodb://localhost:27017/Motos")
        console.log('Connected to Motos database')
    } catch (error) {
        console.log('Error connecting to Motos database')
    }
}

module.exports = { conn }
