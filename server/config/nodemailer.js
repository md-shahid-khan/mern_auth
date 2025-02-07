import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();


const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    }
});

export const sendTestEmail = async () => {
    try {
        const info = await transporter.sendMail({
            from: "widohulk46@gmail.com", // Sender email address
            to: 'arifalvi0015@gmail.com', // Receiver email address
            subject: 'Test Email',
            text: 'This is a test email sent via Brevo SMTP.',
        });
        console.log("Test email sent: ", info.messageId);
    } catch (error) {
        console.error("Error sending test email: ", error);
    }
};



export default transporter;