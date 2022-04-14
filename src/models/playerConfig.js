/**
    “all_labels”: [embeddedDocument]
    “attributes”: [embeddedDocument]
    “player_model”: embeddedDocument
*/
import { mongoose } from "./../database/connection";

const playerConfigSchema = mongoose.Schema({
    id: {},
    insert_name: {},
    progress: {},
    inventory_max: {},
    inventory_equipped_slots: {},
    attribute_start: {},
    dice: {},
    points: {}
});

const playerConfig = mongoose.model("playerConfig", playerConfigSchema);

export { playerConfig };