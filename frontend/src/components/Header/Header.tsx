import { AppBar, Toolbar, Typography } from "@mui/material";

const Header = () => {
  const user = {
    nombre: "Cristian Tobar",
    correo: "cristian@example.com",
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {user.nombre}
        </Typography>
        <Typography variant="body1">{user.correo}</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
