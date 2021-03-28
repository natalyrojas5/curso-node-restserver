const { response, request } = require('express');

const userGet = (req = request, res = response) => {
  const { apiKey, nombre } = req.query;

  res.json({
    msg: 'get API - controller',
    apiKey,
    nombre,
  });
};

const userPost = (req, res = response) => {
  const body = req.body;
  res.json({
    msg: 'post API - controller',
    data: body,
  });
};

const userDelete = (req, res = response) => {
  res.json({
    msg: 'delete API - controller',
  });
};

const userPut = (req, res = response) => {
  const { id } = req.params;
  res.json({
    msg: 'put API - controller',
    id,
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
