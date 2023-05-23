// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();
const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
// const cors = require('cors');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
// eslint-disable-next-line import/no-extraneous-dependencies
const helmet = require('helmet');
const router = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const corsHandler = require('./middlewares/corsHandler');
// const corsOptions = require('./middlewares/cors');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

// app.use('*', cors(corsOptions));
// app.use(cors({
//   origin: ['http://spanko.mesto.nomoredomains.monster', 'https://spanko.mesto.nomoredomains.monster', 'http://localhost:3000', 'https://localhost:3000'],
// }));

app.use(corsHandler);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(helmet());

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT);
