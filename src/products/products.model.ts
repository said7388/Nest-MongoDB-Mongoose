import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  img: { type: String, required: true },
  location: { type: String, required: true },
});

export interface Product extends mongoose.Document {
  id: string;
  title: string;
  img: string;
  location: string;
}
