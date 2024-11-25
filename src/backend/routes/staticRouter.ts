import Express from 'express';
import path from 'path';
import { publicPath } from '../config/configData.js';
import { validateNumericParams } from '../middlewares/validateNumericParams.js';

const staticRouter = Express.Router();

staticRouter.get('/newUser', (req: Express.Request, res: Express.Response) => {
    const targetFilePath = path.join(publicPath, "/newUser.html");
    res.sendFile(targetFilePath);
});

staticRouter.get('/updateUser/:id', validateNumericParams, (req: Express.Request, res: Express.Response) => {
    const targetFilePath = path.join(publicPath, "/updateUser.html");
    res.sendFile(targetFilePath);
});

staticRouter.get('/usersManagement', (req: Express.Request, res: Express.Response) => {
    const targetFilePath = path.join(publicPath, "/usersManagement.html");
    res.sendFile(targetFilePath);
});

staticRouter.get('/login', (req: Express.Request, res: Express.Response) => {
    const targetFilePath = path.join(publicPath, "/login.html");
    res.sendFile(targetFilePath);
});
<<<<<<< HEAD
=======

export {staticRouter} ;
>>>>>>> e0ccdbc6091f29f7fd8b7d102799bf75d3d2f88d

export {staticRouter} ;
