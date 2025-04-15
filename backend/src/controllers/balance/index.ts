import { NextFunction, Request, Response } from "express";
import { balanceModel } from "../../models/balance";
import { userModel } from "../../models/users";

type RequestBody = {
  id_user: string;
  balance: number;
};

export const updateBalance = async (
  req: Request<{}, {}, RequestBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const dataUser = await userModel.findByIdAndUpdate(body.id_user, {
      balance: body.balance,
    });
    if (dataUser) {
      return res.status(404).json({ msg: "Monto Actualizado" });
    }
    const balance = req.body;
    await balanceModel.create(balance);
    res.status(200).json({ data: balance, status: true });
  } catch (err) {
    next(err);
  }
};
