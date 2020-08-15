const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const todosRoute = require('./routes/todos');

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
  .catch(err => console.log(err));

app.use('/', todosRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
