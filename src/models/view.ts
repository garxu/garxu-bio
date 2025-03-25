import { Schema, model, models } from 'mongoose';

const viewSchema = new Schema({
  ip: { type: String, required: true, unique: true },
  count: { type: Number, default: 1 }
});

const View = models.View || model('View', viewSchema);
export default View;
