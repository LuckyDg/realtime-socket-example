require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { connectDB } = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middlewares/errorHandler');
const setupSocket = require('./socket');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST'],
  },
});

app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL }));

connectDB();

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/api', userRoutes);

app.use(errorHandler);

setupSocket(io);

const PORT = process.env.PORT || 65000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
