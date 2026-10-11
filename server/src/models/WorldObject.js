import mongoose from 'mongoose';

const { Schema } = mongoose;

const WorldObjectSchema = new Schema(
  {
    key: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    subtitle: { type: String, default: null },
    message: { type: String, required: true },
    connection: { type: String, default: null },
    badge: { type: String, default: null },
    opensScene: { type: String, default: null },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model('WorldObject', WorldObjectSchema);
