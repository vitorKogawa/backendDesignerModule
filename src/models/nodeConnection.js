const mongoose = require('../database/connection');

const nodeConnectionSchema = mongoose.Schema({
    _id: {
        type: String,
        require: true
    },
    source: {
        type: String,
        require: true
    },
    target: {
        type: String,
        require: true
    },
    gameId: {
        type: String,
        require: true
    }

}, { _id: false }); 

const GameNodeConnection = mongoose.model('nodeConnection', nodeConnectionSchema);

module.exports = GameNodeConnection;