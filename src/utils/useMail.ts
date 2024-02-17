"use strict";
import nodemailer from "nodemailer";

export default function useMail() {
    const transporter = nodemailer.createTransport({
        host: "localhost",
        port: 1025,
        // secure: true,
        // auth: {
        //     user: "REPLACE-WITH-YOUR-ALIAS@YOURDOMAIN.COM",
        //     pass: "REPLACE-WITH-YOUR-GENERATED-PASSWORD",
        // },
    });

    async function sendMail(mail:
        { from?: string, to?: string, subject?: string, text?: string, html?: string }) {
        console.log(mail)
        const info = await transporter.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>',
            to: "bar@example.com, baz@example.com",
            subject: "Hello ✔",
            text: "Hello world?",
            html: "<b>Hello world?</b>",
        });
        console.log("Message sent: %s", info.messageId);
    }

    return {
        sendMail
    }
}