import { NextFunction, Request, Response } from "express";
import { userModel, UserType } from "../../models/users";

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: UserType | null = await userModel.findOne();
    if (!user) {
      return res.status(404).json({ message: "No hay usuarios registrados" });
    }
    res.status(200).json({ data: user, status: true });
  } catch (err) {
    next(err);
  }
};

export const AddUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const datauser = await userModel.findOne();
    if (datauser) {
      await userModel.updateOne({
        uid: datauser.id,
        balance: req.body.balance,
      });
      return res.status(404).json({ message: "Usuario Actualizado" });
    }
    const user = req.body;
    await userModel.create(user);
    res.status(200).json({ data: user, status: true });
  } catch (err) {
    next(err);
  }
};
