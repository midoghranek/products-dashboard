import { auth } from "@local/utils";
import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import { ExitToApp } from "@material-ui/icons";
import { useRouter } from "next/router";

const Appbar = () => {
  const router = useRouter();
  const signOut = () => {
    auth.signOut().then(() => router.push("/login"));
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Products Dashboard
        </Typography>
        <IconButton color="inherit" onClick={() => signOut()}>
          <ExitToApp />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
