import UserQuestion from "../../models/user-questions-model.js";
import buildQuestionTable from "../../utils/buildQuestionTable.js";

export default async function adminDeleteFunction(ctx) {
  try {
    const questionIdMatch = ctx.callbackQuery?.data?.match(/^delete_(.+)/);
    if (!questionIdMatch || !questionIdMatch[1]) {
      await ctx.reply("Question ID not found. Please try again.");
      return;
    }

    const questionId = questionIdMatch[1];

    const deletedQuestion = await UserQuestion.findByIdAndDelete(questionId);

    if (!deletedQuestion) {
      await ctx.reply("Question not found for deletion.");
      return;
    }

    await ctx.reply(
      `The question "${deletedQuestion.question}" has been successfully deleted.`
    );
    await ctx.answerCbQuery();

    const userMessage =
      `Your question:\n<b>${deletedQuestion.question}</b>\n\n` +
      `Unfortunately, it will not be reviewed. Possible reasons include:\n` +
      `- The question violates community rules.\n` +
      `- The question was poorly formulated.\n` +
      `- The administrator cannot process this request.\n\n` +
      `If you believe this was a mistake, feel free to submit a new question.`;

    await ctx.telegram.sendMessage(deletedQuestion.chatId, userMessage, {
      parse_mode: "HTML",
    });

    const { tableMessage, keyboardButtons } = await buildQuestionTable();
    const GroupChatId = process.env.GROUP_CHAT_ID;

    await ctx.telegram.sendMessage(GroupChatId, tableMessage, {
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: keyboardButtons,
      },
    });
  } catch (error) {
    console.error("Error while deleting question:", error);
    await ctx.reply(
      "An error occurred while deleting the question. Please try again later.",
      { show_alert: true }
    );
  }
}
