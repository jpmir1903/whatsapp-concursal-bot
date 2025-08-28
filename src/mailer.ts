import nodemailer from 'nodemailer';
import { cfg } from './config';

const transporter = nodemailer.createTransport({
  host: cfg.smtp.host,
  port: cfg.smtp.port,
  secure: false,
  auth: {
    user: cfg.smtp.user,
    pass: cfg.smtp.pass
  }
});

export async function sendMail(to: string, subject: string, text: string) {
  await transporter.sendMail({
    from: `"Defensa Impuestos" <${cfg.smtp.user}>`,
    to,
    subject,
    text
  });
}
