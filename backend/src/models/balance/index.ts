import mongoose, { Schema, Document } from "mongoose";

interface BalanceType extends Document {
  id_user: string;
  balance: number;
}

const balanceSchema: Schema<BalanceType> = new Schema({
  id_user: { type: String, required: true },
  balance: { type: Number, required: true },
});

balanceSchema.methods.toJSON = function () {
  const { __v, _id, ...balance } = this.toObject();
  balance.uid = _id;
  return balance;
};

const balanceModel = mongoose.model<BalanceType>("balance", balanceSchema);
export { balanceModel, balanceSchema };
