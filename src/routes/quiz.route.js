import { Router } from "express";
import { QuizController } from "../controllers/quiz.controller.js";

const QuizRouter = Router();

QuizRouter.get("/", QuizController.getAllQuiz);
QuizRouter.get("/:id", QuizController.getQuizById);
QuizRouter.get("/user", QuizController.getQuizByUserId);
QuizRouter.post("/", QuizController.createQuiz);
QuizRouter.put("/", QuizController.updateQuiz);
QuizRouter.delete("/:id", QuizController.deleteQuiz);

export default QuizRouter;
