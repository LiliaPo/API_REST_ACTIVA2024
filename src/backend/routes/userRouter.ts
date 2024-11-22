import express from 'express';
import { validateNumericParams } from '../middlewares/validateNumericParams.js';
import { createUser, getUsers, getUserById, deleteUser } from '../controllers/userController.js';
import { DeleteResult } from '../types/DeleteResult.js';

const userRouter = express.Router();

// GET /api/users - Obtener todos los usuarios
userRouter.get('/', async (req, res) => {
    await getUsers(req, res);
});

// GET /api/users/:id - Obtener un usuario por ID
userRouter.get('/:id', validateNumericParams, async (req, res) => {
    await getUserById(req, res);
});

// POST /api/users - Crear un nuevo usuario
userRouter.post('/', async (req, res) => {
    await createUser(req, res);
});

// DELETE /api/users/:id - Eliminar un usuario
userRouter.delete('/:id', validateNumericParams, async (req, res) => {
    await deleteUser(req, res);
});

export default userRouter;