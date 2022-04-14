/**
    “all_labels”: [embeddedDocument]
    “attributes”: [embeddedDocument]
    “player_model”: embeddedDocument
*/
import { mongoose } from "./../database/connection";

const rewardsSchema = mongoose.Schema({
    id: {},
    insert_name: {},
    progress: {},
    inventory_max: {},
    inventory_equipped_slots: {},
    attribute_start: {},
    dice: {},
    points: {}
});

const rewards = mongoose.model("rewards", rewardsSchema);

export { rewards };