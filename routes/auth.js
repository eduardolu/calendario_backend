const { Router } = require('express');
const {check} = require('express-validator')
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();


router.post(
    '/new', 
    [//middlewares
        check('name','el nombre es obrigatorio').not().isEmpty(),
        check('email','el email es obrigatorio').isEmail(),
        check('passward','la contraseña minimo de 6').isLength({min: 6}),
        validarCampos
    ],
    crearUsuario);
router.post(
    '/',
    [//middlewares
        check('email','el email es obrigatorio').isEmail(),
        check('passward','la contraseña minimo de 6').isLength({min: 6}),
        validarCampos
    ],
     loginUsuario);
router.get('/renew', revalidarToken);

module.exports =router;