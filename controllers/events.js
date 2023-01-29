const { response } = require("express")
const Evento = require('../models/Evento')


const crearEventos = async(req,res = response)=>{
    const evento = new Evento(req.body)

    try {
        evento.user = req.uid;
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

const getEventos = async(req,res = response)=>{

    const eventos = await Evento.find()
                        .populate('user', 'name')

    return res.status(200).json({
        ok: true,
        eventos: eventos
    })
}

const actualizarEventos = async(req,res = response)=>{

    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        
        const evento = await Evento.findById(eventoId);

        if (!evento) {
            return res.status(404).json({
                ok:false,
                msg:'evento no existe'
            })
        }
        if ( evento.user.toString() !== uid) {
            return res.status(401).json({
                ok:false,
                msg:'no has creado tu el evento'
            })
        }
        const nuevoEvento = {
            ...req.body,
            user:uid
        }
        const eventoActulizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new:true })

        res.json({
            ok:true,
            eventoActulizado
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'habla con el administrador(1)'
        })  
    }
}

const eliminarEventos = async(req,res = response)=>{

    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        
        const evento = await Evento.findById(eventoId);

        if (!evento) {
            return res.status(404).json({
                ok:false,
                msg:'evento no existe'
            })
        }
        if ( evento.user.toString() !== uid) {
            return res.status(401).json({
                ok:false,
                msg:'no tienes previlegio para eliminar'
            })
        }

        await Evento.findByIdAndRemove(eventoId)

        res.json({
            ok:true,
            msg:"evento eliminado"
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'habla con el administrador(1)'
        })  
    }
}

module.exports = {
    getEventos, actualizarEventos, crearEventos, eliminarEventos
}