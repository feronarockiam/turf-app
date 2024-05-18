const Booking = require('../models/Booking');
const Razorpay = require('razorpay');

exports.createBooking = async (req, res) => {
    const { turfId, slot, date } = req.body;
    const userId = req.user.id;
    try {
        // Payment logic and booking creation
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        });

        const payment_capture = 1;
        const amount = 500; // Example amount
        const currency = "INR";

        const options = {
            amount: (amount * 100).toString(),
            currency,
            receipt: `receipt_order_${Date.now()}`,
            payment_capture
        };

        const response = await instance.orders.create(options);

        const booking = new Booking({
            user: userId,
            turf: turfId,
            slot,
            date,
            paymentId: response.id
        });

        await booking.save();
        res.json({ booking, orderId: response.id });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
