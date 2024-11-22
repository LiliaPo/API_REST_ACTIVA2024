import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRouter from './routes/apiRouter.js';
import { staticRouter } from './routes/staticRouter.js';
import { initDatabase } from './config/configDb.js';

const app = express();
const PORT = parseInt(process.env.PORT || '3000');

app.use(express.json());
app.use(express.static(path.join(__dirname, '../..', 'public')));

// Middleware para logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

app.use('/api', apiRouter);
app.use('/', staticRouter);

// Manejador de errores
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo salió mal!' });
});

// Intentar diferentes puertos si el 3000 está ocupado
const startServer = async (port: number) => {
    try {
        await initDatabase();
        app.listen(port, () => {
            console.log(`Servidor corriendo en http://localhost:${port}`);
        });
    } catch (err) {
        if ((err as any).code === 'EADDRINUSE') {
            console.log(`Puerto ${port} en uso, intentando puerto ${port + 1}`);
            startServer(port + 1);
        } else {
            console.error('Error al iniciar el servidor:', err);
            process.exit(1);
        }
    }
};

startServer(PORT);