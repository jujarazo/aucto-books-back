import * as mongoose from 'mongoose';

export const BookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: true,
  },
});
