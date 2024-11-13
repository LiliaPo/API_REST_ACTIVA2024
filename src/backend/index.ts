import express from 'express';
import apiRouter from './routes/apiRouter.js';
import { staticRouter } from './routes/staticRouter.js';
import pool from './config/configDb.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Test de conexión a la BD
pool.connect()
    .then(() => console.log('Conexión a PostgreSQL establecida'))
    .catch(err => console.error('Error conectando a PostgreSQL:', err));

// Middleware para logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Rutas
app.use('/api', apiRouter);
app.use('/', staticRouter);

// Manejador de errores
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo salió mal!' });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});