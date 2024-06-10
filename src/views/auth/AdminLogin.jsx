import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { RiAdminFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { admin_login, messageClear } from "../../store/Reducers/authReducer";
import { ScaleLoader } from "react-spinners";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { overrideStyle } from "../../utils/utils";

const defaultTheme = createTheme();

export default function AdminLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loader, errorMessage, successMessage } = useSelector(
    (state) => state.auth
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Xử lý đăng nhập ở đây
    dispatch(admin_login(data));
  };

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      navigate("/");
    }
  }, [errorMessage, successMessage]);

  return (
    <div className="min-w-screen min-h-screen bg-gray-200 flex justify-center items-center">
      <div className="lg:w-[30%] sm:w-[60%] p-2 h-fit">
        <div className="bg-white p-4 rounded-2xl shadow-xl">
          <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <RiAdminFill />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Admin Login Form
                </Typography>
                <Box
                  noValidate
                  component="form"
                  onSubmit={handleSubmit(onSubmit)}
                  sx={{ mt: 1 }}
                >
                  <TextField
                    color="secondary"
                    type="email"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /\b[A-Za-z0-9._%+-]+@gmail\.com\b/,
                        message: "Email must end with @gmail.com",
                      },
                    })}
                    error={errors.email ? true : false}
                    helperText={errors.email && errors.email.message}
                  />
                  <TextField
                    color="secondary"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    {...register("password", { required: true })}
                    error={errors.password ? true : false}
                    helperText={errors.password && "Password is required"}
                  />
                  <Button
                    disabled={loader ? true : false}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    {loader ? (
                      <ScaleLoader
                        speedMultiplier={1.3}
                        height={25}
                        width={4}
                        color="#CB51D0"
                        cssOverride={overrideStyle}
                      />
                    ) : (
                      "Login"
                    )}
                  </Button>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
}
