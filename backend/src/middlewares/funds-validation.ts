import { NextFunction, Request, Response } from "express";
import { userModel } from "../models/users";
import { FundsType } from "../models/funds";

export const calculateBalance = async (
  req: Request<{}, {}, FundsType>,
  res: Response,
  next: NextFunction
) => {
  const id_user = req.body.id_user;
  const user = await userModel.findById(id_user);
  if (user?.balance! < req.body.amont) {
    return res.status(400).json({
      status: false,
      msg: "Fondos insuficientes",
    });
  }
  next();
};

export const idStateFundIsInRange = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const state = req.body.state;
  if (state < 0 || state > 2) {
    return res.status(400).json({
      status: false,
      msg: "Estado de fondo fuera de rango",
    });
  }
  next();
};
