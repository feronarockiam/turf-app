// utils/emailService.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendOTPEmail = async (to, otp) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: '🔒 Your One-Time Password',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
                <h1 style="text-align: center; color: #333;">Hello,</h1>
                <p style="color: #666;">We received a request for Signup.</p>
                <hr style="border-top: 1px solid #ddd; margin: 20px 0;">
                <p><strong>Your One-Time Password:</strong></p>
                <p style="font-size: 24px; font-weight: bold; color: #007BFF;">${otp}</p>
                <p>Please enter this OTP in the designated field on our website to complete the password reset process.</p>
                <p>If you did not initiate this request, please ignore this email or contact us directly.</p>
                <hr style="border-top: 1px solid #ddd; margin: 20px 0;">
                <p style="text-align: center; color: #999;"><small>Thank you,<br>Our Team</small></p>
            </div>
        `,
    };
    

    try {
        await transporter.sendMail(mailOptions);
        console.log('OTP email sent');
    } catch (error) {
        console.error('Error sending OTP email:', error);
    }
};

module.exports = {
    sendOTPEmail,
};
