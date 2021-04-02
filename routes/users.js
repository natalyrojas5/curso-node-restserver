const { Router } = require('express');
const { check } = require('express-validator');

const {
  isValidRole,
  isValidMail,
  isValidUserId,
} = require('../helpers/db-validators');
const { validateFields } = require('../middlewares/validate-fields');

const {
  userGet,
  userPost,
  userDelete,
  userPut,
  userPatch,
} = require('../controllers/user');

const router = Router();

router.get('/', userGet);

router.post(
  '/',
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('mail', 'El correo no es válido').isEmail(),
    check('mail').custom(isValidMail),
    check('password', 'El password debe ser más de 6 letras').isLength({
      min: 6,
    }),
    check('role').custom(isValidRole),
    /* check('role', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']), */
    validateFields,
  ],
  userPost
);

router.delete(
  '/:id',
  [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(isValidUserId),
    validateFields,
  ],
  userDelete
);

router.put(
  '/:id',
  [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(isValidUserId),
    check('role').custom(isValidRole),
    validateFields,
  ],
  userPut
);

router.patch('/', userPatch);

module.exports = router;
