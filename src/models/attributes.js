/**
    “all_labels”: [embeddedDocument]
    “attributes”: [embeddedDocument]
    “player_model”: embeddedDocument
*/
import { mongoose } from "./../database/connection";

const attributesSchema = mongoose.Schema({
    id: {},
    name: {},
    type: {},
    max_value: {},
    default_value: {},
    player_attr: {}
});

const attributes = mongoose.model("attributes", attributesSchema);

export { attributes };