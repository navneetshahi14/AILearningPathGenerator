import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASS,
    },
  });

  async sendMail(to: string, subject: string, text: string) {
    const info = await this.transporter.sendMail({
      from: `"SkillRoute" <${process.env.USER_EMAIL}>`,
      to,
      subject,
      text,
    });

    console.log('Mail sent to ', info.messageId);
  }
}
