const mongoose = require("../database/connection");

const positionSchema = mongoose.Schema({
    x: {
        type: Number
    },
    y: {
        type: Number
    }
})

const gameNodeSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    startNode: {
        type: Boolean,
        require: true,
        default: false
    },
    endNode: {
        type: Boolean,
        require: true,
        default: false
    },
    nodeColor: {
        type: String,
    //    require: true,
    },
    textColor: {
        type: String,
    //    require: true,
    },
    backgroundColor: {
        type: String,
    //    require: true,
    },
    duration: {
        type: Number,
        require: true
    },
    markdownContent: {
        type: String,
        require: true
    },
    labels: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "label"
    }],
    compiled_content: {
        type: String,
    }, 
    position: positionSchema,
    nextNodes: [{
        id : String,
        choice : String
    }],
    theme: {
        type: String,
    },
    nodeImage: {
        type: String
    },
    nodeType: {
        type: String,
        require: true
    }
}); 

const GameNode = mongoose.model('gameNode', gameNodeSchema);

module.exports = GameNode;