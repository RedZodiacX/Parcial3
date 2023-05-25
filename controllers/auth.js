const express = require('express')
const Pedido = require('../models/PedidoScheme')
const Coordenada = require('../models/CoordenadaScheme')

const newPedido = async (req, res = express.response) => {
    const { id, fecha } = req.body
    try {

        let pedido = await Pedido.findOne({ id: id })
        if (pedido) {
            return res.status(400).json({
                ok: false,
                msg: 'Ese pedido ya existe',
            })
        }

        pedido = new Pedido(req.body)
        await pedido.save()

        return (
            res.status(200).json({
                ok: true,
                pedido,
            })
        )

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            error
        })
    }

}

const newCoordenada = async (req, res = express.response) => {
    const { X, Y, pedido_id } = req.body
    try {
        let pedido = await Pedido.findOne({ id: pedido_id })
        if (!pedido) {
            return res.status(400).json({
                ok: false,
                msg: 'Ese pedido no existe.'
            })
        }
        let coordenada = new Coordenada(req.body)
        await coordenada.save()

        return (
            res.status(200).json({
                ok: true,
                coordenada,
            })
        )

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            error
        })
    }
}


module.exports = {
    newPedido,
    newCoordenada
}