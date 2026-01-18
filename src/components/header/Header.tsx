import AppBar from "@mui/material/AppBar";
import { Link } from "react-router";
import logo from "/kombio-logo.png";
import styles from "../../css/Header.module.css";
import { Button, Container, Box, Grid, Toolbar } from "@mui/material";
import Login from "./Login";
import CreateAccount from "./CreateAccount";
import { useState } from "react";

export default function Header() {
  const [activeDialog, setActiveDialog] = useState("");

  const clearSessionStorage = () => {
    sessionStorage.clear();
  };

  const closeDialog = () => {
    setActiveDialog("");
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
                <Link to="/" onClick={clearSessionStorage}>
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
              <Button className={styles.links} variant="contained" onClick={() => setActiveDialog("login")}>
                Login
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <Login open={activeDialog === "login"} onClose={closeDialog} onSwitchToCreate={()=>setActiveDialog("createAccount")}></Login>
      <CreateAccount open={activeDialog === "createAccount"} onClose={closeDialog} onSwitchToLogin={()=>setActiveDialog("login")}></CreateAccount>
    </Container>
  );
}
