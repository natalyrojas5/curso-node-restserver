const Role = require('../models/role');
const User = require('../models/user');
var mongoose = require('mongoose');

const isValidRole = async (role = '') => {
  const roleExists = await Role.findOne({ role });
  if (!roleExists) {
    throw new Error(`El rol ${role} no está registrado en la BD`);
  }
};

const isValidMail = async (mail = '') => {
  const mailExists = await User.findOne({ mail });

  if (mailExists) {
    throw new Error(`El correo ${mail} ya está registrado`);
  }
};

const isValidUserId = async (id) => {
  if (id.length > 24) {
    throw new Error(`El id no se encuentra registrado`);
  }

  const idParam = mongoose.Types.ObjectId(id);

  const userIdExists = await User.findById({ _id: idParam });

  if (!userIdExists) {
    throw new Error(`El id no se encuentra registrado`);
  }
};

module.exports = {
  isValidRole,
  isValidMail,
  isValidUserId,
};
