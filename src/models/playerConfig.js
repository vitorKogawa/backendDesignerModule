/**
    “all_labels”: [embeddedDocument]
    “attributes”: [embeddedDocument]
    “player_model”: embeddedDocument
*/
import { mongoose } from "./../database/connection";

const playerConfigSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    insert_name: {
        type: Boolean,
        default: false
    },
    progress: {
        type: Boolean
    },
    inventory_max: {
        type: Number
    },
    inventory_equipped_slots: {
        type: Number
    },
    attribute_start: {
        type: String
    },
    dice: {
        //roll_number
        type: Number
    },
    points: {
        //max_limit
        type: Number
    }
});

const playerConfig = mongoose.model("playerConfig", playerConfigSchema);

export { playerConfig };