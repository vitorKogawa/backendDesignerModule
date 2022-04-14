/**
    “all_labels”: [embeddedDocument]
    “attributes”: [embeddedDocument]
    “player_model”: embeddedDocument
*/
import { mongoose } from "./../database/connection";

const eventSchema = mongoose.Schema({
    id: {},
    name: {},
    source_type: {},
    source_id: {},
    operator: {},
    value: {},
    target_type: {},
    target_id: {},
    modifier: {}
});

const events = mongoose.model("events", eventSchema);

export { events };