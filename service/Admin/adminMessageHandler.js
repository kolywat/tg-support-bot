import { AdminAnswer } from "../../models/admin-answer-model.js";
import UserQuestion from "../../models/user-questions-model.js";
import buildQuestionTable from "../../utils/buildQuestionTable.js";

export default async function adminMessageHandler(ctx) {
  const message = ctx.message?.text;

  if (!message) {
    console.log("Admin message does not contain text.");
    return;
  }

  const adminSession = ctx.session?.currentQuestion;

  if (!adminSession) {
    await ctx.reply(
      "There is no active question to answer. Please select a question from the list."
    );
    return;
  }

  const { questionId, username, chatId, question } = adminSession;

  try {
    const savedAnswer = await AdminAnswer.create({
      questionId,
      username,
      chatId,
      question,
      answer: message,
    });

    await UserQuestion.findByIdAndDelete(questionId);

    await ctx.telegram.sendMessage(
      chatId,
      `Your question:\n<b>${question}</b>\n\nAdmin's answer:\n<b>${message}</b>`,
      { parse_mode: "HTML" }
    );

    await ctx.reply(
      "The answer was successfully sent to the user and removed from the questions database."
    );

    // Optional: delete the saved answer (if you don't want to store it)
    // await AdminAnswer.findByIdAndDelete(savedAnswer._id);

    const { tableMessage, keyboardButtons } = await buildQuestionTable();
    await ctx.telegram.sendMessage(ctx.chat.id, tableMessage, {
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: keyboardButtons,
      },
    });

    ctx.session.currentQuestion = null;
  } catch (error) {
    console.error("Error while processing admin answer:", error);
    await ctx.reply(
      "An error occurred while processing the answer. Please try again later."
    );
  }
}
