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
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(email);
    console.log(username);
    console.log(password);
    handleClose();
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
              ></TextField>
              <TextField
                required
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              ></TextField>
              <TextField
                required
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
