import AppBar from "@mui/material/AppBar";
import { Link } from "react-router";
import logo from "/kombio-logo.png";
import styles from "../../css/Header.module.css";
import { Button, Container, Box, Grid, Toolbar, Menu, MenuItem } from "@mui/material";
import Login from "./Login";
import CreateAccount from "./CreateAccount";
import { useState, useEffect } from "react";
import { URL, socket } from "../../app/socket";

export default function Header() {
  const [activeDialog, setActiveDialog] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem("kombioUsername")) {
      setLoginSuccess(true);
    }
  }, []);

  const handleProfileClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = async () => {
    setAnchorEl(null);
    setLoginSuccess(false);
    sessionStorage.removeItem("kombioUsername");
    const url = `${URL}/users/logout`;

    try {
      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
      });
      const result = await response.json();
      if (response.ok) {
        socket.emit("sendSnackbar", "info", "Successfully logged out");
      } else {
        console.error(result.error);
      }
    } catch (error) {
      console.error("Logout failed");
    }
  };

  return (
    <Container sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Grid
            sx={{
              minWidth: "100%",
              justifyContent: "space-between",
            }}
            container
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Grid sx={{ paddingRight: "1em" }}>
                <Link to="/" onClick={() => sessionStorage.clear()}>
                  <img src={logo} alt="Logo" className={styles.logo} />
                </Link>
              </Grid>

              <Grid sx={{ paddingRight: "1em" }}>
                <Button>
                  <Link className={styles.links} to="/rules">
                    Rules
                  </Link>
                </Button>
              </Grid>
              <Grid sx={{ paddingRight: "1em" }}>
                <Button>
                  <Link className={styles.links} to="/stats">
                    Stats
                  </Link>
                </Button>
              </Grid>
            </Box>

            <Grid>
              {loginSuccess ? (
                <Box>
                  <Button variant="contained" onClick={handleProfileClick}>
                    {sessionStorage.getItem("kombioUsername")}
                  </Button>
                  <Menu id="basic-menu" open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)} anchorEl={anchorEl}>
                    <MenuItem onClick={() => setAnchorEl(null)}>Profile</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </Box>
              ) : (
                <Button className={styles.links} variant="contained" onClick={() => setActiveDialog("login")}>
                  Login
                </Button>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <Login
        open={activeDialog === "login"}
        onClose={() => setActiveDialog("")}
        onSwitchToCreate={() => setActiveDialog("createAccount")}
        onLoginSuccess={() => setLoginSuccess(true)}
      ></Login>
      <CreateAccount
        open={activeDialog === "createAccount"}
        onClose={() => setActiveDialog("")}
        onSwitchToLogin={() => setActiveDialog("login")}
        onLoginSuccess={() => setLoginSuccess(true)}
      ></CreateAccount>
    </Container>
  );
}
