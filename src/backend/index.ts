import Express from 'express';
import { publicPath, __dirname } from './config/configData.js';
import { staticRouter } from './routes/staticRouter.js';
import apiRouter from './routes/apiRouter.js';
import methodOverride from 'method-override';
import path from 'path';
import { loginRouter } from './routes/loginRouter.js';

const app = Express();
const PORT = parseInt(process.env.PORT || '3000');

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(Express.static(path.join(__dirname, '../..', 'public')));

// Middleware para logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

app.use('/src', Express.static(path.join(__dirname, '../../public/src')));

app.use(methodOverride('_method'));

app.use("/", staticRouter);
app.use("/login", loginRouter);
app.use("/api/v1/", apiRouter);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});


