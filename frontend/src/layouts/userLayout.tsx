import { Box } from "@mui/material";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <Box display="flex" height="100vh">
      <Sidebar />
      <Box flexGrow={1} display="flex" flexDirection="column">
        <Header />
        <Box component="main" flexGrow={1} p={3}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default UserLayout;
