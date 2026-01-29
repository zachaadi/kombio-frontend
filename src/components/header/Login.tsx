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

const Login = ({
  open,
  onClose,
  onSwitchToCreate,
}: {
  open: boolean;
  onClose: () => void;
  onSwitchToCreate: () => void;
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(username);
    console.log(password);
    handleClose();
  };

  const handleClose = () => {
    setUsername("");
    setPassword("");
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
