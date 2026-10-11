import mongoose from 'mongoose';

const { Schema } = mongoose;

const FragranceSchema = new Schema(
  {
    key: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    number: { type: String, required: true },
    notes: [String],
    layeredNotes: {
      top: String,
      heart: String,
      base: String
    },
    description: { type: String, required: true },
    signature: { type: Boolean, default: false },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model('Fragrance', FragranceSchema);
