import UserService from "../services/user.service.js";

const loginUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const token = await UserService.loginUser(username, password);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

const registerUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await UserService.registerUser(username, password);
    res.json("Đăng ký thành công");
  } catch (error) {
    next(error);
  }
};

const loginAdmin = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await UserService.loginAdmin(username, password);
    res.json({ user });
  } catch (error) {
    next(error);
  }
};

export const UserControllers = {
  loginUser,
  registerUser,
  loginAdmin,
};
