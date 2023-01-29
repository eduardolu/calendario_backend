
const { Router } = require('express');
const { check } =require('express-validator')
const { getEventos, crearEventos, actualizarEventos, eliminarEventos } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJwt } = require("../middlewares/validar-jwt")

const router = Router();

//validacion de token
router.use( validarJwt )

//obtener evento
router.post(
    '/', 
    [
        check('title','titulo no debe estar vacio').not().isEmpty(),
        check('start','fecha inicio no debe estar vacio').custom(isDate),
        check('end','fecha final no debe estar vacio').custom(isDate),
        validarCampos
    ],
    crearEventos
)

router.get('/', getEventos)

router.put('/:id', actualizarEventos)

router.delete('/:id', eliminarEventos)

module.exports =router;