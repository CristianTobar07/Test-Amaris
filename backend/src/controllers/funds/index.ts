import { NextFunction, Response, Request } from "express";
import { fundsModel, FundsType } from "../../models/funds";
import { userModel } from "../../models/users";

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await fundsModel.find();
    res.status(200).json({ data: data, status: true });
  } catch (err) {
    next(err);
  }
};

export const getOpenFunds = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await fundsModel.find({ state: 1 });
    console.log({data});
    res.status(200).json({ data: data, status: true });
  } catch (err) {
    next(err);
  }
};

export const create = async (
  req: Request<{}, {}, FundsType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id_user, amont, ...rest } = req.body;

    const user = await userModel.findById(id_user);
    const fund = await fundsModel.create({ id_user, amont, ...rest });

    if (user) {
      user.balance -= +amont;
      await user.save();
    }

    return res.status(201).json({
      message: "Fondo creado exitosamente",
      data: fund,
    });
  } catch (error) {
    next(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const updateStateFund = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const data = await fundsModel.findByIdAndUpdate(body.id_fund, {
      state: body.state,
    });

    if (data === null) {
      res.status(404).json({ msg: "Fondo no existe" });
    } else {
      res
        .status(201)
        .json({ msg: "Estado cancelado exitosamente", status: true });
    }
  } catch (err) {
    next(err);
  }
};
