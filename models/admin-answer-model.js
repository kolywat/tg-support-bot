import mongoose, {model, Schema} from "mongoose";


const AdminAnswerSchema = new Schema({
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: "UserQuestion", required: true },
    username: { type: String, required: true },
    chatId: { type: Number, required: true },
    question: { type: String, required: true },
    answer: { type: String, required: true },
    answeredAt: { type: Date, default: Date.now }
});

export const AdminAnswer = model("AdminAnswer", AdminAnswerSchema);
