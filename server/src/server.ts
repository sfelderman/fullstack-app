import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import todosRoute from './routes/todos';
import usersRoute from './routes/users';
import dotenv from 'dotenv';
import { UnauthorizedError } from 'express-jwt';
import checkJWT from './init/checkJwt';

dotenv.config();
// "start": "nodemon --inspect-brk=9229 index.js",

const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

const db = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@sf-book-library-xbh9b.gcp.mongodb.net/full-stack?retryWrites=true&w=majority`;

// Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log('MongoDB successfully connected'))
  .catch((err: unknown) => console.error(err));

app.get('/healthz', function (req, res) {
  res.status(200).json({ message: 'Server Running' });
});

// use JWT on the api routes

app.use('/users', usersRoute);
app.use('/todos', checkJWT, todosRoute);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof UnauthorizedError) {
    console.log(err);
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
});

const PORT = process.env.OPTIC_API_PORT || process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
