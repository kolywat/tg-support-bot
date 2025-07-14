import UserQuestion from "../models/user-questions-model.js";
import { Markup } from "telegraf";

export default async function buildQuestionTable() {
  const questions = await UserQuestion.find().sort({ createdAt: -1 });

  if (questions.length === 0) {
    return { tableMessage: "No new questions.", keyboardButtons: [] };
  }

  let tableMessage = "<b>Current questions:</b>\n\n";
  let keyboardButtons = [];

  questions.forEach((q, index) => {
    const username = q.username || "Name not provided";
    const question = q.question || "No question provided";
    const createdAt = q.createdAt
      ? new Date(q.createdAt).toLocaleString()
      : "Date not specified";

    tableMessage += `<b>${
      index + 1
    }.</b> <i>${username}</i> - <b>${question}</b> - <i>${createdAt}</i>\n`;

    keyboardButtons.push([
      Markup.button.callback(`Answer question ${index + 1}`, `answer_${q._id}`),
      Markup.button.callback(`Delete question ${index + 1}`, `delete_${q._id}`),
    ]);
  });

  return { tableMessage, keyboardButtons };
}
