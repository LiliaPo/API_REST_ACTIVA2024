import { QueryResult } from "pg";
import pool from "../config/configDb.js";
import { DeleteResult } from "../types/DeleteResult.js";
import { User } from "../types/user.js";

export async function saveNewUser(user: User): Promise<User> {
    const queryString = `INSERT INTO "user" ("userName", "name", "first_surname", "password", "email") VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const values = [user.userName, user.name, user.first_surname, user.password, user.email];
    const result = await pool.query(queryString, values);
    return result.rows[0];
}

export async function getUsers(): Promise<User[]> {  
    const queryString = `SELECT * FROM "user"`;
    const result = await pool.query(queryString);
    return result.rows;
}

export async function findUserById(id: string): Promise<User | null> {
    const queryString = `SELECT * FROM "user" WHERE "id" = $1`;
    const result = await pool.query(queryString, [id]);
    return result.rows[0] || null;
}

export async function deleteUserById(id: string): Promise<DeleteResult> {
    try {
        const queryString = `DELETE FROM "user" WHERE "id" = $1`;
        const result = await pool.query(queryString, [id]);
        
        if (result.rowCount && result.rowCount > 0) {
            return {
                success: true,
                message: 'Usuario eliminado correctamente',
                rowsAffected: result.rowCount
            };
        } else {
            return {
                success: false,
                message: 'No se encontró el usuario',
                rowsAffected: 0
            };
        }
    } catch (error) {
        return {
            success: false,
            message: `Error al eliminar usuario: ${(error as Error).message}`
        };
    }
}

export async function findUserByEmail(email: string): Promise<User | null> {
    const queryString = 'SELECT * FROM "user" WHERE "email" = $1';
    const result = await pool.query(queryString, [email]);
    return result.rows[0] || null;
}

export async function updateUserById(id: string, userData: Partial<User>): Promise<User | null> {
    const fields = Object.keys(userData)
        .filter(key => userData[key as keyof User] !== undefined)
        .map((key, index) => `"${key}" = $${index + 1}`);
    
    const values = Object.values(userData).filter(value => value !== undefined);
    values.push(id);

    const queryString = `
        UPDATE "user" 
        SET ${fields.join(', ')}
        WHERE id = $${values.length}
        RETURNING *
    `;

    const result = await pool.query(queryString, values);
    return result.rows[0] || null;
}
export async function findUserByUsername(userName: string): Promise<User | null> {
    const queryString = 'SELECT * FROM "user" WHERE "userName" = $1';
    const result = await pool.query(queryString, [userName]);
    return result.rows[0] || null;
}
