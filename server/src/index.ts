import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import todosRoute from './routes/todos';
import usersRoute from './routes/users';
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

app.use('/api/', todosRoute);
app.use('/api/', usersRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
