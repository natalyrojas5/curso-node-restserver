const { Router } = require('express');
const {
  userGet,
  userPost,
  userDelete,
  userPut,
  userPatch,
} = require('../controllers/user');

const router = Router();

router.get('/', userGet);

router.post('/', userPost);

router.delete('/', userDelete);

router.put('/:id', userPut);

router.patch('/', userPatch);

module.exports = router;
