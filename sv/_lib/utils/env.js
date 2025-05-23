/*
بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ  ﷺ  
InshaAllah, By his marcy I will Gain Success 
*/

import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { dirname as dir, resolve } from 'path';
import { fileURLToPath as f } from 'url';
const __dirname = dir(f(import.meta.url));
process.env={};
dotenv.config({ path: resolve(__dirname, '../../d.env') });




export const SDATABASE = process.env.SDATABASE;
export const DATABASE = process.env.DATABASE;
export const PAYPAL_LINK = process.env.PAYPAL_LINK;
export const PAYPAL_MODE = process.env.PAYPAL_MODE;
export const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
export const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
export const T_PAYPAL_CLIENT_ID = process.env.T_PAYPAL_CLIENT_ID;
export const T_PAYPAL_SECRET = process.env.T_PAYPAL_SECRET;
export const BASE_URL = process.env.BASE_URL;
export const MAIL_HOST = process.env.MAIL_HOST;
export const MAIL_PORT = process.env.MAIL_PORT;
export const MAIL_USER = process.env.MAIL_USER;
export const MAIL_PASS = process.env.MAIL_PASS;
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
export const ADMIN_PHONE = process.env.ADMIN_PHONE;
export const FROM_EMAIL = process.env.FROM_EMAIL;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_SECRET_KEY = process.env.CLOUDINARY_SECRET_KEY;
export const T_STRIPE_KEY = process.env.T_STRIPE_KEY;
export const GRAND_MASTER_GROUP_MASSAGE_ID = process.env.GRAND_MASTER_GROUP_MASSAGE_ID;
export const FV_PAGE_ACCESS_TOKEN = process.env.FV_PAGE_ACCESS_TOKEN;
export const FB_PAGE_ID = process.env.FB_PAGE_ID;
export const TWITER_USER_ACCESS_TOKEN = process.env.TWITER_USER_ACCESS_TOKEN;
export const TWITER_USER_ACCESS_TOKEN_SECRET = process.env.TWITER_USER_ACCESS_TOKEN_SECRET;
export const TWITTER_APP_SECRET = process.env.TWITTER_APP_SECRET;
export const TWITTER_APP_KEY = process.env.TWITTER_APP_KEY;
export const TWITTER_BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;
export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
export const YOUTUBE_CLIENT_ID = process.env.YOUTUBE_CLIENT_ID;
export const YOUTUBE_CLIENT_SECRET = process.env.YOUTUBE_CLIENT_SECRET;
export const YOUTUBE_API_REDIRECT_URL = process.env.YOUTUBE_API_REDIRECT_URL;
export const INSTAGRAM_USER_ID = process.env.ISTAGRAM_USER_ID;
export const FACEBOOK_GRAPH_API = process.env.FACEBOOK_GRAPH_API;
export const FACEBOOK_GRAPH_VERSION = process.env.FACEBOOK_GRAPH_VERSION;
export const ISTRAGRAM_ACCESS_TOKEN = process.env.ISTRAGRAM_ACCESS_TOKEN;
export const TIKTOK_CLIENT_KEY = process.env.TIKTOK_CLIENT_KEY;
export const TIKTOK_CLIENT_SECRET = process.env.TIKTOK_CLIENT_SECRET;
export const TIKTOK_REDIRECT_URI = process.env.TIKTOK_REDIRECT_URI;
export const LINKEDIN_KEY = process.env.LINKEDIN_KEY;
export const LINKEDIN_SECRET = process.env.LINKEDIN_SECRET;
export const LINKEDIN_PERSON_URN = process.env.LINKEDIN_PERSON_URN;
export const LINKEDIN_REDIRECT_URI = process.env.LINKEDIN_REDIRECT_URI;
export const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
export const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;
export const APP_AUTH_TOKEN = process.env.APP_AUTH_TOKEN;
export const TEST_DATABASE = process.env.TEST_DATABASE;
export const FACEBOOK_VIDEO_UPLOAD_TIMEOUT = Number(process.env.FACEBOOK_VIDEO_UPLOAD_TIMEOUT);
export const ORGANIZATION_NAME = process.env.ORGANIZATION_NAME;
export const whiteHeader = readFileSync(resolve(__dirname, '../../tamplates/partials/whiteHeader.hbs'), 'utf-8');
export const Footer = readFileSync(resolve(__dirname, '../../tamplates/partials/Footer.hbs'), 'utf-8');
export const LinksHbs = readFileSync(resolve(__dirname, '../../tamplates/partials/Links.hbs'), 'utf-8');
export const noindex_meta_tags = (`<meta name="robots" content="noindex"><meta name="googlebot" content="noindex"> `);
export const SERVICE_WORKER_PUBLIC_KEY='BBQwXL2fe9F7G3tzL3t1gPx5QhmDBSqs-v_MY1UyvqODVOvuWv8KinOar4jkWsqVSjWJsk0k_XdY_eae4un4DJc';
export const PAYPAP_CURRENCY='CAD';
export const STRIPE_CURRENCY='cad';