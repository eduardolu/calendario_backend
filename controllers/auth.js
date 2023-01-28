const { response } =require('express');
const { validationResult } = require ('express-validator');
const bcrypt = require('bcryptjs')
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');


const crearUsuario = async(req,res = response)=>{
    const { email, passward} =req.body;

    try {
        let usuario = await Usuario.findOne({ email })
        //console.log(usuario);
        
        if (usuario) {
            return res.status(400).json({
                ok:false,
                msg:'usuario ya eiste',
            })
        }
        usuario = new Usuario(req.body);
        //encryptar la contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( passward, salt );

        console.log({usuario});

        await usuario.save();

        //generar JWT (token)
        const token = await generarJWT(usuario.id, usuario.name)

        res.status(201).json({
            ok:true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"habla con el admin"
        })
    }
}
const loginUsuario = async(req,res)=>{
    const {email, passward} =req.body;
    
    try {
        const usuario = await Usuario.findOne({ email })
        
        if (!usuario) {
            return res.status(400).json({
                ok:false,
                msg:'usuario o contraseña no es correcto(email)',
            })
        }

        //confirmar passward
        const validPassword = bcrypt.compareSync( passward, usuario.password);

        console.log(validPassword);
        if (!validPassword) {
            return res.status(400).json({
                ok:true,
                msg:'usuario o contraseña no es correcto(password)',
            })
        }

        //generar JWT (token)
        const token = await generarJWT(usuario.id, usuario.name)

        res.status(200).json({
            ok:true,
            msg:'todo esta correcto',
            uid:usuario.id,
            name: usuario.name,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"habla con el admin"
        })
    }

}
const revalidarToken = async(req,res)=>{

    const {uid, name} = req
    //generar JWT (token)
    const token = await generarJWT(uid, name)

    res.json({
        ok:true,
        msg: 'renew',
        token,
    })
}

module.exports = {
    crearUsuario, loginUsuario, revalidarToken,
}