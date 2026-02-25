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
import { useForm, Controller } from "react-hook-form";
import { TransitionProps } from "@mui/material/transitions";
import { URL, socket } from "../../app/socket";
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
  email: z.email("Invalid email address"),
  username: z
    .string()
    .trim()
    .min(3, "Username must be between 3 and 12 characters")
    .max(12, "Username must be between 3 and 12 characters")
    .regex(/^\S*$/, "No spaces allowed"),
  password: z
    .string()
    .trim()
    .min(8, "Password must be between 8 and 20 characters")
    .max(20, "Password must be between 8 and 20 characters")
    .regex(/^\S*$/, "No spaces allowed"),
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
  const handleCreateAccount = async (data: any) => {
    const headers = {
      "Content-Type": "application/json",
    };

    const url = `${URL}/users/create`;

    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        email: data.email,
        username: data.username,
        password: data.password,
      }),
      credentials: "include",
    });
    const result = await response.json();

    if (response.ok) {
      sessionStorage.setItem("kombioUsername", result.username);
      onLoginSuccess();
      handleClose();
      socket.emit("sendSnackbar", "info", `Welcome ${result.username}!`);
    } else {
      if (result.error === "Email already exists") {
        setError("email", { type: "server", message: result.error });
      }
      if (result.error === "Username already exists") {
        setError("username", { type: "server", message: result.error });
      }
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const switchDialog = () => {
    handleClose();
    onSwitchToLogin();
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    defaultValues: {
      email: "",
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
          Create account
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(handleCreateAccount)}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: ".5em" }}>
              <Controller
                control={control}
                name={"email"}
                render={({ field }) => (
                  <TextField {...field} label="email" error={!!errors.email} helperText={errors.email?.message} />
                )}
              ></Controller>
              <Controller
                control={control}
                name={"username"}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="username"
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
                    label="password"
                    type="password"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                )}
              ></Controller>
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
