import "dotenv/config";

if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
  throw new Error(
    "Make sure you have MONGO_URI & JWT_SECRET in your .env file"
  );
}

export const config = {
  MONGO_URI: process.env.MONGO_URI!,
  JWT_SECRET: process.env.JWT_SECRET!,
  PORT: process.env.PORT!,
  JWT_TOKEN_EXPIRES_IN: 3600000 * 24 * 7, //EXPIRES IN 7 DAYS
  consumer_secret: process.env.CONSUMER_SECRET!,
  consumer_key: process.env.CONSUMER_KEY!,
  short_code: 174379,
  passkey: process.env.PASSKEY,
  phone_number: process.env.PHONE_NUMBER,
};
