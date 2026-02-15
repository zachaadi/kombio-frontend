import React, { useState } from "react";
import {
  Slide,
  Box,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { URL, socket } from "../../app/socket";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Login = ({
  open,
  onClose,
  onSwitchToCreate,
  onLoginSuccess,
}: {
  open: boolean;
  onClose: () => void;
  onSwitchToCreate: () => void;
  onLoginSuccess: () => void;
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = `${URL}/users/login`;

    const headers = {
      "Content-Type": "application/json",
    };

    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ username: username, password: password }),
      credentials: "include",
    });

    const result = await response.json();
    if (response.ok) {
      sessionStorage.setItem("kombioUsername", result.username);
      onLoginSuccess();
      handleClose();
      socket.emit("sendSnackbar", "info", `Welcome ${result.username}!`);
    } else if (result.error === "Username or Password was incorrect") {
      setLoginError(result.error);
    }
  };

  const handleClose = () => {
    setUsername("");
    setPassword("");
    setLoginError("");
    onClose();
  };

  const switchDialog = () => {
    handleClose();
    onSwitchToCreate();
  };

  return (
    <Container>
      <Dialog
        slots={{
          transition: Transition,
        }}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle sx={{ textAlign: "center" }} className="">
          Login or create account
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleLogin}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Username"
                value={username}
              ></TextField>
              <TextField
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password"
                placeholder="Password"
                value={password}
              ></TextField>
              {loginError != "" ? <Box sx={{ color: "red" }}>{loginError}</Box> : ""}
            </Box>
            <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
              <Button type="submit" variant="contained">
                Login
              </Button>
              <Button variant="contained" onClick={handleClose}>
                Cancel
              </Button>
            </DialogActions>
          </form>
          <Typography sx={{ textAlign: "center", fontStyle: "italic" }}>Don't have an account?</Typography>
          <Typography
            onClick={switchDialog}
            sx={{
              "&:hover": { cursor: "pointer", textDecoration: "underline" },
              color: "blue",
              textAlign: "center",
            }}
          >
            Create Here
          </Typography>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default Login;
