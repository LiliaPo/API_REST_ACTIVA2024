import { Request, Response, NextFunction } from 'express';

export function validateNumericParams(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ error: 'ID inválido' });
        return;
    }
    next();
};