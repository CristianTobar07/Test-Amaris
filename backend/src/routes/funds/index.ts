import express from "express";
import {
  getAll,
  create,
  updateStateFund,
  getOpenFunds,
} from "../../controllers/funds";
import {
  fundsUpdateValidations,
  fundsValidations,
} from "../../validations/funds-validations";
import { validateEmptyFileds } from "../../middlewares/validate-fields";
import { validateObjectIds } from "../../middlewares/validate-format-uid";
import { existUser } from "../../middlewares/user-validation";
import {
  calculateBalance,
  idStateFundIsInRange,
} from "../../middlewares/funds-validation";

export const routerFunds = express.Router();

routerFunds.get("/funds", getAll);
routerFunds.get("/funds/open", getOpenFunds);
routerFunds.post(
  "/funds/create",
  [
    ...fundsValidations,
    validateEmptyFileds,
    validateObjectIds(["id_user"]),
    existUser,
    calculateBalance,
  ],
  create
);

routerFunds.patch(
  "/funds/update",
  [
    ...fundsUpdateValidations,
    validateEmptyFileds,
    validateObjectIds(["id_fund"]),
    idStateFundIsInRange,
  ],
  updateStateFund
);
