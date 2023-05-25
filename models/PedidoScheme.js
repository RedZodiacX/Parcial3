const { Schema, model } = require('mongoose')

const PedidoScheme = Schema({
    id: {
        type: Number,
        require: true,
        unique: true
    },
    fecha: {
        type: String,
        require: true
    }
}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
})

PedidoScheme.virtual('Coordenadas', {
    ref: 'Coordenada',
    localField: 'id',
    foreignField: 'pedido_id',
    justOne: false,
})

module.exports = model('Pedido', PedidoScheme)