import { Router } from "express";

import { balanceValidations } from "../../validations/balance-validation";
import { validateEmptyFileds } from "../../middlewares/validate-fields";
import { validateObjectIds } from "../../middlewares/validate-format-uid";
import { existUser } from "../../middlewares/user-validation";
import { updateBalance } from "../../controllers/balance/index";

const routerBalance = Router();

routerBalance.patch(
  "/balance",
  [
    ...balanceValidations,
    validateEmptyFileds,
    validateObjectIds(["id_user"]),
    existUser,
  ],
  updateBalance
);

export default routerBalance;
