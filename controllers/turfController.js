const Turf = require('../models/Turf');

exports.getTurfs = async (req, res) => {
    try {
        const turfs = await Turf.find();
        res.json(turfs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.checkAvailability = async (req, res) => {
    const { turfId, date } = req.body;
    try {
        const turf = await Turf.findById(turfId);
        if (!turf) {
            return res.status(404).json({ msg: 'Turf not found' });
        }
        // Check availability logic
        res.json(turf.availableSlots);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
