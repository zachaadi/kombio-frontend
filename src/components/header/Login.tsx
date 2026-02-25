import React from "react";
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
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const formSchema = z.object({
  username: z.string().trim().min(1, "Username is required"),
  password: z.string().trim().min(1, "Password is required"),
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
  const handleLogin = async (data: any) => {
    const url = `${URL}/users/login`;

    const headers = {
      "Content-Type": "application/json",
    };

    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ username: data.username, password: data.password }),
      credentials: "include",
    });

    const result = await response.json();
    if (response.ok) {
      sessionStorage.setItem("kombioUsername", result.username);
      onLoginSuccess();
      handleClose();
      socket.emit("sendSnackbar", "info", `Welcome ${result.username}!`);
    } else if (result.error === "Username or Password was incorrect") {
      setError("root", { type: "server", message: result.error });
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const switchDialog = () => {
    handleClose();
    onSwitchToCreate();
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(formSchema),
  });

  return (
    <Container>
      <Dialog
        slots={{
          transition: Transition,
        }}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle sx={{ textAlign: "center", pb: ".5em" }} className="">
          Login or create account
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(handleLogin)}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: ".5em" }}>
              <Controller
                control={control}
                name={"username"}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Username"
                    error={!!errors.username}
                    helperText={errors.username?.message}
                  />
                )}
              ></Controller>
              <Controller
                control={control}
                name={"password"}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Password"
                    type="password"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                )}
              ></Controller>

              {errors.root && <Box sx={{ color: "red" }}>{errors.root?.message}</Box>}
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
