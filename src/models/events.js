/**
    “all_labels”: [embeddedDocument]
    “attributes”: [embeddedDocument]
    “player_model”: embeddedDocument
*/
import { mongoose } from '../database/connection';

const eventSchema = mongoose.Schema({
  // _id: {
  //     type: String,
  //     required: true
  // },
  name: {
    type: String,
    required: true,
  },
  source_type: {
    type: String,
  },
  source_id: {
    type: String,
  },
  operator: {
    type: String,
  },
  value: {
    type: Number,
  },
  target_type: {
    type: String,
  },
  target_id: {
    type: String,
  },
  modifier: {
    type: String,
  },
});

const Events = mongoose.model("events", eventSchema);

export { Events };
