const express = require('express');
const cors = require('cors');

const loginRoutes = require('./routes/loginRoutes');
const userRoutes = require('./routes/userRoutes');
const petRoutes = require('./routes/petRoutes');
const adoptionRoutes = require('./routes/adoptionRoutes');

const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/login', loginRoutes);
app.use('/users', userRoutes);
app.use('/pets', petRoutes);
app.use('/adoptions', adoptionRoutes);

// Middleware de tratamento de erros
app.use(errorMiddleware);

module.exports = app;
