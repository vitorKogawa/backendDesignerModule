/**
    “all_labels”: [embeddedDocument]
    “attributes”: [embeddedDocument]
    “player_model”: embeddedDocument
*/
import { mongoose } from "./../database/connection";

const rewardsSchema = mongoose.Schema({
    // _id: {
    //     type: String,
    //     required: true
    // },
    name: {
        type: String
    },
    badge_image: {
        type: String
    }
});

const rewards = mongoose.model("rewards", rewardsSchema);

export { rewards };