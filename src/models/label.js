import { mongoose } from '../database/connection';

const labelSchema = mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
    default: '#94e722',
  },
});

const Label = mongoose.model("label", labelSchema);

export { Label };
