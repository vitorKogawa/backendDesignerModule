import { mongoose } from './../database/connection'

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

const NodeConnectionSchema = mongoose.model('nodeConnection', nodeConnectionSchema);

export { NodeConnectionSchema }