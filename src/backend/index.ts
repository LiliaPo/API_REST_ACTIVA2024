import Express from 'express';
import { publicPath, __dirname } from './config/configData.js';
import { staticRouter } from './routes/staticRouter.js';
import apiRouter from './routes/apiRouter.js';
import methodOverride from 'method-override';
import path from 'path';
import { loginRouter } from './routes/loginRouter.js';
import session from 'express-session';

const app = Express();
const PORT = parseInt(process.env.PORT || '3000');

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(Express.static(path.join(__dirname, '../..', 'public')));

<<<<<<< HEAD
// Middleware para logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

app.use('/src', Express.static(path.join(__dirname, '../../public/src')));

app.use(methodOverride('_method'));
=======
app.use(Express.static(publicPath));

app.use('/src', Express.static(path.join(__dirname, '../../public/src')));

app.use(session({
  secret: process.env.SESSION_SECRET as string,
  resave: false,
  saveUninitialized: true,
  name: 'sessionData',
  cookie: { secure: false, maxAge: 1000 * 60 * 60 * 2, },
}));

app.use(methodOverride((req:Express.Request, res:Express.Response)=> {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));
>>>>>>> 6bd5c5961f0cb423ed2c920a2180baa1fc9d2aa4

app.use("/", staticRouter);
app.use("/login", loginRouter);
app.use("/api/v1/", apiRouter);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});


