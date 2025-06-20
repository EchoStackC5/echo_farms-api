import mongoose, { Schema, model } from "mongoose"
import normalize from "normalize-mongoose"

const advertSchema = new Schema({
  productTitle: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: [String],
    enum: ['Farm Machinery', 'Crop Protection', 'Seed & Planting Materials', 'Animal Husbandry Products', 'Drones', 'Solar Energy'],
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  photos: [
    {
      type: String, // URLs of images
    }
  ],
  plan: {
    type: String,
    enum: ['Free Trial', 'Basic', 'Enterprise'],
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

advertSchema.plugin(normalize);

export const Advert = model('Advert', advertSchema);
