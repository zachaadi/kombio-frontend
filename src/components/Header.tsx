import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Link } from "react-router";
import logo from "/kombio-logo.png";
import styles from "../css/Header.module.css";
import Grid from "@mui/material/Grid";

export default function Header() {
  const clearSessionStorage = () => {
    sessionStorage.clear();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Grid container spacing={2}>
            <Grid>
              <Link to="/" onClick={clearSessionStorage}>
                <img src={logo} alt="Logo" className={styles.logo} />
              </Link>
            </Grid>

            <Grid>
              <Button>
                <Link className={styles.links} to="/rules">
                  Rules
                </Link>
              </Button>
            </Grid>
            <Grid>
              <Button>
                <Link className={styles.links} to="/stats">
                  Stats
                </Link>
              </Button>
            </Grid>

            <Grid>
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
