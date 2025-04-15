import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import CurrentFund from "../pages/CurrentFund/CurrentFund";
import OpenFund from "../pages/OpenFund/OpenFund";
import TransactionHistory from "../pages/TransactionHistory/TransactionHistory";
import UserLayout from "../layouts/userLayout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<UserLayout />}>
        <Route path="/fondo-actual" element={<CurrentFund />} />
        <Route path="/abrir-fondo" element={<OpenFund />} />
        <Route path="/historial" element={<TransactionHistory />} />
      </Route>
      <Route path="*"  element={<Home />} />
    </Routes>
  );
};

export default AppRoutes;
