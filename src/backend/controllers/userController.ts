import { Request, Response } from 'express';
import * as userModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import { User } from '../types/user.js';

const SALT_ROUNDS = 10;

export async function createUser(req: Request, res: Response) {
    try {
        // Encriptar la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(req.body.password, SALT_ROUNDS);
        
        const newUser = {
            ...req.body,
            password: hashedPassword
        };

        const savedUser = await userModel.saveNewUser(newUser);
        res.status(201).json(savedUser);
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ error: 'Error al crear usuario' });
    }
}

export async function loginUser(req: Request, res: Response) {
    try {
        const { email, password } = req.body;
        const user = await userModel.findUserByEmail(email);

        if (!user) {
            return res.status(401).json({ error: 'Usuario no encontrado' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        const { password: _, ...userWithoutPassword } = user;
        res.json(userWithoutPassword);
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ error: 'Error en el proceso de login' });
    }
}

export async function getUsers(req: Request, res: Response) {
    try {
        const users = await userModel.getUsers();
        const usersWithoutPasswords = users.map((user: User) => {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        });
        res.json(usersWithoutPasswords);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
}

export async function getUserById(req: Request, res: Response) {
    try {
        const user = await userModel.findUserById(req.params.id);
        if (user) {
            const { password, ...userWithoutPassword } = user;
            res.json(userWithoutPassword);
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        res.status(500).json({ error: 'Error al obtener usuario' });
    }
}

export async function deleteUser(req: Request, res: Response) {
    try {
        const result = await userModel.deleteUserById(req.params.id);
        res.json(result);
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ error: 'Error al eliminar usuario' });
    }
}