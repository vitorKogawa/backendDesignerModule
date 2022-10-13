/**
    “all_labels”: [embeddedDocument]
    “attributes”: [embeddedDocument]
    “player_model”: embeddedDocument
*/
import { mongoose } from '../database/connection';

const attributesSchema = mongoose.Schema({
  // _id: {
  //     type: String,
  //     required: true
  // },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  },
  max_value: {
    type: Number,
    default: 0,
  },
  default_value: {
    type: Number,
    default: 0,
  },
  player_attr: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
  },
});

const Attributes = mongoose.model("attributes", attributesSchema);

export { Attributes };
