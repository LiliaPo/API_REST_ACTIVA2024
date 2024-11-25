import argon2 from 'argon2';
import { LoginUser } from '../types/LoginUser.js';
import { findUserByUsername } from '../models/userModel.js';
import { LoginResult } from '../types/LoginResult.js';
import { User } from '../types/user.js';

export async function userLogin(user: LoginUser): Promise<LoginResult> {
    const result: LoginResult = {
        success: false,
        message: 'Error desconocido',
        statusCode: 500,
        data: []
    };

    try {
        const userData = await findUserByUsername(user.userName);
        
        if (!userData) {
            result.message = 'Usuario no encontrado';
            result.statusCode = 404;
            return result;
        }

        const isPasswordValid = await argon2.verify(userData.password, user.password);
        
        if (isPasswordValid) {
            result.success = true;
            result.message = 'Usuario encontrado';
            result.statusCode = 200;
            
            // Excluir la contraseña de los datos devueltos
            const { password, ...userWithoutPassword } = userData;
            result.data = [userWithoutPassword];
        } else {
            result.message = 'Contraseña incorrecta';
            result.statusCode = 401;
        }
    } catch (error) {
        result.message = error instanceof Error ? error.message : 'Error desconocido';
        result.statusCode = 500;
    }

    return result;
}

