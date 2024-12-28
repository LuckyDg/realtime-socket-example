const mongoose = require('mongoose');
const logger = require('./logger');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN);
    logger.info('Base de datos conectada exitosamente');
  } catch (error) {
    logger.error('Error al conectar la base de datos:', error);
    process.exit(1);
  }
};

module.exports = { connectDB };
