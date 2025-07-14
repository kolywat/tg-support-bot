import dotenv from "dotenv";
dotenv.config();

export const ENV = {
  MONGO_URI:
    process.env.MONGODB_URI || "mongodb://localhost:27017/<your_database_name>",
  BOT_TOKEN: process.env.BOT_TOKEN,
  PORT: process.env.PORT || 4000,
  SERVER_NAME: process.env.SERVER_NAME || "BotName",
  GROUP_CHAT_ID: process.env.GROUP_CHAT_ID || "-1001234567890",
};
