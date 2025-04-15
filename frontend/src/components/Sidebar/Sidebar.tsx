// src/components/Sidebar.tsx
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
  Toolbar,
  AppBar,
  Grid,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AddBoxIcon from "@mui/icons-material/AddBox";
import HistoryIcon from "@mui/icons-material/History";
import LogoutIcon from "@mui/icons-material/Logout";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";

import { useLocation, Link } from "react-router-dom";
import { useState } from "react";

const drawerWidth = 240;

const Sidebar = () => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const items = [
    {
      text: "Fondo Actual",
      to: "/fondo-actual",
      icon: <AccountBalanceWalletIcon />,
    },
    { text: "Abrir Fondo", to: "/abrir-fondo", icon: <AddBoxIcon /> },
    {
      text: "Historial de Transacciones",
      to: "/historial",
      icon: <HistoryIcon />,
    },
    { text: "Cerrar Sesión", to: "/", icon: <LogoutIcon /> },
  ];

  const drawerContent = (
    <Box>
      <Grid
        container
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={1}
        component="div"
        paddingY={2}
      >
        <AssuredWorkloadIcon fontSize="large" />
        <Typography variant="h5" fontWeight="bold">
          FDI
        </Typography>
      </Grid>
      <List>
        {items.map((item) => (
          <ListItem key={item.to} disablePadding>
            <ListItemButton
              component={Link}
              to={item.to}
              selected={location.pathname === item.to}
              onClick={() => isMobile && setMobileOpen(false)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {/* Top bar solo visible en mobile */}
      {isMobile && (
        <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              FDI
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      {/* Drawer para desktop */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      {/* Drawer temporal para móviles */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;
