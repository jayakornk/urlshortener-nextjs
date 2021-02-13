import mongoose, { Document, Model } from 'mongoose';
import { nanoid } from 'nanoid';

import { IUser } from './User';

export interface IUrl extends Document {
  longUrl: string;
  shortUrl: string;
  clicks: number;
  userId: IUser['_id'];
}

const UrlSchema = new mongoose.Schema(
  {
    longUrl: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      required: true,
      default: () => nanoid(8),
    },
    clicks: {
      type: Number,
      required: true,
      default: 0,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Url: Model<IUrl> =
  mongoose.models.Url || mongoose.model<IUrl>('Url', UrlSchema);

export default Url;
