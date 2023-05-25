const { Schema, model } = require('mongoose')

const CoordenadaScheme = Schema({
    X: {
        type: Number,
        required: true
    },
    Y: {
        type: Number,
        required: true
    },
    pedido_id: {
        type: Number,
        required: true,
        ref: 'Pedido'
    }
}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
})

CoordenadaScheme.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
})

module.exports = model('Coordenada', CoordenadaScheme)