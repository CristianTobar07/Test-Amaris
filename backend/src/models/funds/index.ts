import mongoose, { Schema } from "mongoose";

export interface FundsType {
  id_user: string;
  category: string;
  category_name: string;
  amont: number;
  state: number; // 1. Open 2. Closed
}

const fundsSchema: Schema<FundsType> = new Schema({
  id_user: { type: String, required: true },
  category: { type: String, required: true },
  category_name: { type: String, required: true },
  amont: { type: Number, required: true },
  state: { type: Number, required: true },
});

fundsSchema.methods.toJSON = function () {
  const { __v, _id, ...fund } = this.toObject();
  fund.uid = _id;
  return fund;
};

const fundsModel = mongoose.model<FundsType>("funds", fundsSchema);
export { fundsModel, fundsSchema };
