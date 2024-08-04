import { QuizService } from "../services/quiz.service.js";
import jwt from "jsonwebtoken";
import UserService from "../services/user.service.js";
const getAllQuiz = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        res.status(401).json({ message: "Unauthorized" });
      } else {
        try {
          const user = await UserService.findUserById(decoded.id);
          if (user.role !== "admin") {
            throw new Error("You are not admin");
          }
          const quiz = await QuizService.getQuizTest();
          res.json(quiz);
        } catch (error) {
          next(error);
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

const getQuizById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const quiz = await QuizService.getQuizById(id);
    res.json(quiz);
  } catch (error) {
    next(error);
  }
};

const getQuizByUserId = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      res.status(401).json({ message: "Unauthorized" });
    } else {
      try {
        const quiz = await QuizService.getQuizByUserId(decoded.id);
        res.json(quiz);
      } catch (error) {
        next(error);
      }
    }
  });
};

const createQuiz = async (req, res, next) => {
  try {
    const { title, description, ListQuestion } = req.body;
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        res.status(401).json({ message: "Unauthorized" });
      } else {
        try {
          const quiz = await QuizService.createQuiz(decoded.id, {
            title,
            description,
            ListQuestion,
          });
          res.json(quiz);
          next();
        } catch (error) {
          next(error);
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

const updateQuiz = async (req, res, next) => {
  const { id, title, description, ListQuestion } = req.body;
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        res.status(401).json({ message: "Unauthorized" });
      } else {
        try {
          const user = await UserService.findUserById(decoded.id);
          if (user.role !== "admin") {
            throw new Error("You are not admin");
          }
          await QuizService.updateQuiz({
            id,
            title,
            description,
            ListQuestion,
          });
          res.json("Update success");
        } catch (error) {
          next(error);
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

const deleteQuiz = async (req, res, next) => {
  const { id } = req.params;
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        res.status(401).json({ message: "Unauthorized" });
      } else {
        try {
          const user = await UserService.findUserById(decoded.id);
          if (user.role !== "admin") {
            throw new Error("You are not admin");
          }
          await QuizService.deleteQuiz(id);
          res.json("Delete success");
        } catch (error) {
          next(error);
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

export const QuizController = {
  getAllQuiz,
  getQuizById,
  getQuizByUserId,
  createQuiz,
  updateQuiz,
  deleteQuiz,
};
