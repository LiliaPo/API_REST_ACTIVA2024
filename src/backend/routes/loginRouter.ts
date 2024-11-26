import Express from "express";
import { LoginUser } from "../types/LoginUser.js";
import { userLogin } from "../controllers/loginController.js";

const loginRouter = Express.Router();

loginRouter.post('/', async (req: Express.Request, res: Express.Response) => {
  const user: LoginUser = {userName: req.body.username, password: req.body.password};
  const result = await userLogin(user);
  if (result.success) {
    if (result.data?.[0] && 'role' in result.data[0]) {
      req.session.userName = user.userName;
      req.session.role = result.data[0].role as string;
    }
  }
  res.json(result);
});

export {loginRouter};

