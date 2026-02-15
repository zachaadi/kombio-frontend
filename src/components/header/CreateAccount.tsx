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
import { URL } from "../../app/socket";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateAccount = ({
  open,
  onClose,
  onSwitchToLogin,
  onLoginSuccess,
}: {
  open: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
  onLoginSuccess: () => void;
}) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      email.trim().length == 0 ||
      username.trim().length == 0 ||
      password.trim().length == 0 ||
      emailError != "" ||
      usernameError != "" ||
      passwordError != ""
    ) {
      return;
    }

    setUsernameError("");
    setEmailError("");

    const headers = {
      "Content-Type": "application/json",
    };

    const url = `${URL}/users/create`;

    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        email: email,
        username: username,
        password: password,
      }),
      credentials: "include",
    });
    const result = await response.json();

    if (response.ok) {
      sessionStorage.setItem("kombioUsername", result.username);
      handleClose();
      onLoginSuccess();
    } else {
      if (result.error === "Email already exists") {
        setEmailError(result.error);
      }
      if (result.error === "Username already exists") {
        setUsernameError(result.error);
      }
    }
  };

  const handleClose = () => {
    setEmail("");
    setEmailError("");
    setUsername("");
    setUsernameError("");
    setPassword("");
    setPasswordError("");
    onClose();
  };

  const switchDialog = () => {
    handleClose();
    onSwitchToLogin();
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
          Create account
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleCreateAccount}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                required
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                error={emailError != "" ? true : false}
                helperText={emailError}
              ></TextField>
              <TextField
                required
                placeholder="Username"
                onChange={(e) => {
                  setUsername(e.target.value);
                  setUsernameError(e.target.value.length < 3 ? "Username must be at least 3 characters" : "");
                }}
                value={username}
                error={usernameError != "" ? true : false}
                helperText={usernameError}
              ></TextField>
              <TextField
                required
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError(e.target.value.length < 8 ? "Password must be at least 8 characters" : "");
                }}
                value={password}
                error={passwordError != "" ? true : false}
                helperText={passwordError}
              ></TextField>
            </Box>
            <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
              <Button type="submit" variant="contained">
                Join
              </Button>
              <Button variant="contained" onClick={handleClose}>
                Cancel
              </Button>
            </DialogActions>
          </form>
          <Typography sx={{ textAlign: "center", fontStyle: "italic" }}>Already have an account?</Typography>
          <Typography
            onClick={switchDialog}
            sx={{
              "&:hover": { cursor: "pointer", textDecoration: "underline" },
              color: "blue",
              textAlign: "center",
            }}
          >
            Login Now
          </Typography>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default CreateAccount;
