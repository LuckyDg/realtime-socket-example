import { useEffect, useState } from 'react';
import socket from './socket';

const App = () => {
  const [userCount, setUserCount] = useState(0);
  const [userData, setUserData] = useState({ nombre: '', email: '' });
  const [connectionStatus, setConnectionStatus] = useState('Desconectado');

  const handleInputChange = e => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (userData.nombre && userData.email) {
      socket.emit('nuevo_usuario', userData);
      setUserData({ nombre: '', email: '' });
    }
  };

  useEffect(() => {
    socket.on('conteo_usuarios', count => {
      setUserCount(count);
    });

    socket.on('connect', () => {
      setConnectionStatus('Conectado');
    });

    socket.on('disconnect', () => {
      setConnectionStatus('Desconectado');
    });

    return () => {
      socket.off('conteo_usuarios');
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-zinc-950 py-6 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 border-zinc-700 border p-8 rounded-2xl shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Formulario de Registro
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Estado de la conexión:{' '}
            <span
              className={`${
                connectionStatus === 'Conectado'
                  ? 'text-green-500'
                  : 'text-red-500'
              } font-semibold`}
            >
              {connectionStatus}
            </span>
          </p>
          <p className="mt-2 text-md text-gray-600 dark:text-gray-400">
            Conteo de usuarios:{' '}
            <span className="font-semibold text-md text-emerald-600 dark:text-emerald-300">
              {userCount}
            </span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="nombre"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={userData.nombre}
                onChange={handleInputChange}
                required
                className="block w-full px-3 py-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-950 dark:text-white dark:border-gray-600 dark:focus:ring-emerald-300"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                required
                className="block w-full px-3 py-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 dark:bg-zinc-950 dark:text-white dark:border-gray-700 dark:focus:ring-emerald-300"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 dark:bg-emerald-600 dark:hover:bg-emerald-700"
            >
              Registrar Usuario
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
