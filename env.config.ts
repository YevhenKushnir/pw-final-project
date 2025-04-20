import dotenv from 'dotenv';
dotenv.config();
export const config = {
    weburl: process.env.WEB_URL!
}