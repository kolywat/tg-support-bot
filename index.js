import express from "express";
import { Markup, session, Telegraf } from "telegraf";
import dotenv from "dotenv";
import startFunction from "./service/startFunction.js";
import helpFunction from "./service/helpFunction.js";
import userQuestionFunction from "./service/User/userQuestionFunction.js";
import connectDB from "./config/db_config.js";
import userMessageFunction from "./service/User/userMessageFunction.js";
import faqFunction from "./service/faqFunction.js";
import adminAnswerFunction from "./service/Admin/adminAnswerFunction.js";
import adminMessageHandler from "./service/Admin/adminMessageHandler.js";
import adminDeleteFunction from "./service/Admin/adminDeleteFunction.js";
import { ENV } from "./config/constants.js";

dotenv.config();

const app = express();
const bot = new Telegraf(ENV.BOT_TOKEN);
const GroupChatId = Number(ENV.GROUP_CHAT_ID);

bot.use(session());
app.use(express.json());

async function start() {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => {
      console.log(`Server started on port ${ENV.PORT}`);
      console.log(`Bot started!`);
    });
  } catch (error) {
    console.error(error);
  }
}

bot.command("start", (ctx) => startFunction(ctx));
bot.help((ctx) => helpFunction(ctx));
bot.command("ask", (ctx) => userQuestionFunction(ctx));
bot.command("faq", (ctx) => faqFunction(ctx));

bot.on("text", async (ctx) => {
  if (ctx.chat.id === GroupChatId) {
    await adminMessageHandler(ctx);
  } else {
    await userMessageFunction(ctx);
  }
});

bot.action(/^answer_(.+)/, async (ctx) => {
  const questionId = ctx.match[1];
  await adminAnswerFunction(ctx, questionId);
});

bot.action(/^delete_(.+)/, async (ctx) => {
  await adminDeleteFunction(ctx);
});

bot.action("help_command", async (ctx) => {
  await helpFunction(ctx);
  await ctx.answerCbQuery();
});

bot.catch((err) => {
  console.error("Bot error:", err);
});

bot.launch();
start();
