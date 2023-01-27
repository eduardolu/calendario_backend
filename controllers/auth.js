const { response } =require('express');
const { validationResult } = require ('express-validator')


const crearUsuario = (req,res = response)=>{
    const {name, email, passward} =req.body;

    res.status(201).json({
        ok:true,
        msg:'registro',
        name,
        email,
        passward,
    })
}
const loginUsuario = (req,res)=>{
    const {email, passward} =req.body;
    
    res.status(200).json({
        ok:true,
        msg:'login',
        email,
        passward,
    })
}
const revalidarToken = (req,res)=>{
    res.json({
        ok:true,
        msg: 'renew'
    })
}


module.exports = {
    crearUsuario, loginUsuario, revalidarToken,
}