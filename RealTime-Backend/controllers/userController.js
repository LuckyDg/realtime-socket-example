const User = require('../models/user');

const createUser = async (req, res, next) => {
  try {
    const { nombre, email } = req.body;

    if (!nombre || !email) {
      return res.status(400).json({ error: 'Nombre y email son obligatorios' });
    }

    const newUser = new User({ nombre, email });
    await newUser.save();

    return res.status(201).json({ message: 'Usuario creado con éxito' });
  } catch (error) {
    next(error);
  }
};

const getUserCount = async (req, res, next) => {
  try {
    const count = await User.countDocuments();
    return res.status(200).json({ count });
  } catch (error) {
    next(error);
  }
};

module.exports = { createUser, getUserCount };
