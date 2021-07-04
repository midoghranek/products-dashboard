import { auth } from "@local/utils";
import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import { ExitToApp } from "@material-ui/icons";
import { useAppbar } from "./Appbar.hook";

const Appbar = () => {
  const { signOut } = useAppbar();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Products Dashboard
        </Typography>
        <Typography>{auth.currentUser?.email}</Typography>
        <IconButton color="inherit" onClick={() => signOut()}>
          <ExitToApp />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
