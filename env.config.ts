import dotenv from 'dotenv';
dotenv.config();
export const config = {
    WEB_URL: process.env.WEB_URL!,
    USER_EMAIL: process.env.USER_EMAIL,
    USER_PASSWORD: process.env.USER_PASSWORD,
    USER_NAME: process.env.USER_NAME
}