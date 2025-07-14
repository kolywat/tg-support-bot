import { saveUserQuestion } from "../../utils/userQuestionUtil.js";
import { ENV } from "../../config/constants.js";
import buildQuestionTable from "../../utils/buildQuestionTable.js";

export default async function userMessageFunction(ctx) {
  const message = ctx.message?.text;

  if (!message) {
    console.error("The message does not contain text.");
    return;
  }

  const firstName = ctx.from.first_name;
  const lastName = ctx.from.last_name || "";
  const username =
    firstName && lastName ? `${firstName} ${lastName}` : firstName || lastName;
  const chatId = ctx.chat.id;

  const questionMatch = message.match(/Question:\s*(.+)/i);

  if (questionMatch) {
    const question = questionMatch[1];

    try {
      const savedQuestion = await saveUserQuestion(username, chatId, question);

      const { tableMessage, keyboardButtons } = await buildQuestionTable();

      await ctx.telegram.sendMessage(ENV.GroupChatId, tableMessage, {
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: keyboardButtons,
        },
      });

      await ctx.reply(
        "Your question has been successfully submitted. We will respond as soon as possible."
      );
      console.log("Question saved:", savedQuestion);
    } catch (error) {
      console.error("Error while saving the question:", error);
      await ctx.reply(
        "An error occurred while submitting your question. Please try again later."
      );
    }
  } else {
    await ctx.reply(
      "Please start your message with the word 'Question:' followed by your question."
    );
  }
}
