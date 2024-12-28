const User = require('./models/user');

const setupSocket = io => {
  io.on('connection', async socket => {
    console.log(`Cliente conectado: ${socket.id}`);

    try {
      const count = await User.countDocuments();
      socket.emit('conteo_usuarios', count);
    } catch (error) {
      console.error('Error al obtener el conteo inicial:', error);
      socket.emit('conteo_usuarios', 0);
    }

    socket.on('nuevo_usuario', async data => {
      console.log('Nuevo usuario:', data);
      try {
        const newUser = new User(data);
        await newUser.save();

        const updatedCount = await User.countDocuments();
        io.emit('conteo_usuarios', updatedCount);
      } catch (error) {
        console.error('Error al crear usuario:', error);
      }
    });
  });
};

module.exports = setupSocket;
