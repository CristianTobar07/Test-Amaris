import mongoose, { Schema, Document } from "mongoose";

export interface UserType {
  name: string;
  email: string;
  balance: number;
}

const userSchema: Schema<UserType> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  balance: { type: Number, required: true },
});

userSchema.methods.toJSON = function () {
  const { __v, _id, ...user } = this.toObject();
  user.uid = _id;
  return user;
};

const userModel = mongoose.model<UserType>("user", userSchema);
export { userModel, userSchema };
