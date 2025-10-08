import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router";
import logo from "/kombio-logo.png";
import styles from "../css/Header.module.css";

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Link to="/">
            <img src={logo} alt="Logo" className={styles.logo} />
          </Link>
          <Button>
            <Link className={styles.links} to="/rules">
              Rules
            </Link>
          </Button>
          <Button>
            <Link className={styles.links} to="/stats">
              Stats
            </Link>
          </Button>
          <Button className={styles.links} variant="contained">
            Login
          </Button>
          <Button className={styles.links} variant="contained">
            Signup
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
