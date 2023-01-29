const { response } = require("express")
const Evento = require('../models/Evento')


const getEventos = async(req,res = response)=>{
    const evento = new Evento(req.body)

    try {
        const eventoguardado = await evento.save();

        return res.json({
            ok:true,
            evento: eventoguardado,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:'habla con el administrador'
        })
    }
}

const crearEventos = (req,res = response)=>{
    return res.status(200).json({
        ok:true,
        msg:'creareventos'
    })
}

const actualizarEventos = (req,res = response)=>{
    return res.status(200).json({
        ok:true,
        msg:'acualizareventos'
    })
}

const eliminarEventos = (req,res = response)=>{
    return res.status(200).json({
        ok:true,
        msg:'eliminareventos'
    })
}

module.exports = {
    getEventos, actualizarEventos, crearEventos, eliminarEventos
}