const mongoose = require('mongoose');

const FarmerSchema = new mongoose.Schema({
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    coordinates: [{ latitude: Number, longitude: Number }], 
    date: { type: Date, default: Date.now }
}, { versionKey: false });

module.exports = mongoose.model('Farmer', FarmerSchema);
