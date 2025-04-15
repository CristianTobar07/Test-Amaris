import { AppBar, Toolbar, Typography } from "@mui/material";
import { useEffect } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../common/hooks/redux-hooks/reduxHooks";
import { RootState } from "../../store";
import { getDataUser } from "../../common/store/header/headerSlice";

const Header = () => {
  const dispatch = useAppDispatch();

  const { isReloadNeeded, dataUser } = useAppSelector((state: RootState) => {
    return state.header;
  });

  useEffect(() => {
    if (isReloadNeeded) {
      dispatch(getDataUser());
    }
  }, [isReloadNeeded, dispatch]);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {dataUser?.name}
        </Typography>
        <Typography variant="body1">{dataUser?.email}</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
