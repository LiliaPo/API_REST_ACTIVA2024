import Express from 'express';
import { createUser, getUserById, getUsers, deleteUser, updateUser } from '../controllers/userController.js';
import { validateNumericParams } from '../middlewares/validateNumericParams.js';

const userRouter = Express.Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", validateNumericParams, getUserById);
userRouter.post("/", createUser);
userRouter.put("/:id", validateNumericParams, updateUser);
userRouter.delete("/:id", validateNumericParams, deleteUser);

export default userRouter;