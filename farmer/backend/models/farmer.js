const mongoose = require('mongoose');

const FarmerSchema = new mongoose.Schema({
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    date: { type: Date, default: Date.now }
}, { versionKey: false }); // This removes "__v"

module.exports = mongoose.model('Farmer', FarmerSchema);
