import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_DATABASE || 'activa2024',
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432'),
});

export async function initDatabase() {
    try {
        const client = await pool.connect();
        console.log('Conexión a PostgreSQL establecida correctamente');
        client.release();
        return true;
    } catch (err) {
        console.error('Error al conectar con PostgreSQL:', err);
        if ((err as any).code === '28P01') {
            console.error('Error de autenticación: verifica usuario y contraseña');
        }
        throw err;
    }
}

export default pool;