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
}: {
  open: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}) => {
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email.trim().length == 0 || username.trim().length == 0 || password.trim().length == 0) {
      return;
    }

    setUsernameError("");
    setEmailError("");
    const url = "http://localhost:3000/users/create";
    const headers = {
      "Content-Type": "application/json",
    };

    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        email: email,
        username: username,
        password: password,
      }),
    });
    const result = await response.json();

    if (response.ok) {
      console.log(result);
      handleClose();
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
    setUsername("");
    setPassword("");
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
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                error={usernameError != "" ? true : false}
                helperText={usernameError}
              ></TextField>
              <TextField
                required
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
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
