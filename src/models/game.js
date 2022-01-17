/**
    “all_labels”: [embeddedDocument]
    “attributes”: [embeddedDocument]
    “player_model”: embeddedDocument
*/
import { mongoose } from "./../database/connection";

const gameSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    default_node_color: {
        type: String,
        default: "#fff",
    },
    default_text_color: {
        type: String,
        default: "#000",
    },
    //mudar para boolean
    template: {
        type: String,
        default: false,
    },
    image: {
        type: String,
    },
    //upload do modal
    background_image: {
        type: String,
    },
    background_color: {
        type: String,
        default: "#fff",
    },
    nodes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "gameNode",
        },
    ],
    userID: {
        type: String,
        require: true,
    },
});

const Game = mongoose.model("game", gameSchema);

export { Game };
