const { response, request } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

const userGet = async (req = request, res = response) => {
  /* default value desde and limite */
  let num_desde = 0;
  let num_limite = 3;

  /* params */
  let { limite = num_limite, desde = num_desde } = req.query;

  /* Validate is number */
  if (isNaN(limite)) limite = num_limite;
  if (isNaN(desde)) desde = num_desde;

  /* only activated users */
  const query = { state: true };

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);
  res.json({
    total,
    users,
  });
};

const userPost = async (req, res = response) => {
  const { name, mail, password, role } = req.body;
  const user = new User({ name, mail, password, role });

  /* Encrypt password */
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, salt);

  /* Save BD */
  await user.save();
  res.json({
    msg: 'post API - controller',
    data: user,
  });
};

const userDelete = async (req, res = response) => {
  const { id } = req.params;

  const user = await User.findByIdAndUpdate(id, { state: false });
  res.json({
    user,
  });
};

const userPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, mail, ...rest } = req.body;

  /* Validate with the db */
  if (password) {
    /* Encrypt password */
    const salt = bcrypt.genSaltSync();
    rest.password = bcrypt.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, rest);

  res.json({
    data: user,
  });
};

const userPatch = (req, res = response) => {
  res.json({
    msg: 'patch API - controller',
  });
};

module.exports = {
  userGet,
  userPost,
  userDelete,
  userPut,
  userPatch,
};
