const mongoose = require('mongoose');

const TurfSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    availableSlots: [String]
});

module.exports = mongoose.model('Turf', TurfSchema);
