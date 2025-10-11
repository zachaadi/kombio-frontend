import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router";
import logo from "/kombio-logo.png";
import styles from "../css/Header.module.css";
import Grid from "@mui/material/Grid";

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Grid container spacing={2}>
            <Grid item>
              <Link to="/">
                <img src={logo} alt="Logo" className={styles.logo} />
              </Link>
            </Grid>

            <Grid item>
              <Button>
                <Link className={styles.links} to="/rules">
                  Rules
                </Link>
              </Button>
            </Grid>
            <Grid item>
              <Button>
                <Link className={styles.links} to="/stats">
                  Stats
                </Link>
              </Button>
            </Grid>

            <Grid item>
              <Button className={styles.links} variant="contained">
                Login
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
