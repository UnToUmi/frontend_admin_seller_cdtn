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
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { messageClear, seller_login } from "../../store/Reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { ScaleLoader } from "react-spinners";
import { overrideStyle } from "../../utils/utils";

const defaultTheme = createTheme();

export default function Login() {
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
    dispatch(seller_login(data));
    console.log(data);
  };
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      navigate("/");
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

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
                  Login Form
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
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <p
                        onClick={() => navigate("/register")}
                        className="text-purple-800 
                        text-sm cursor-pointer
                         underline hover:text-purple-500
                         mt-1
                         "
                      >
                        {"Do you haven't an account? Register"}
                      </p>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              <div className="w-full flex justify-center items-center mb-3 mt-3">
                <div className="w-[45%] bg-slate-700 h-[1px]"></div>

                <div className="w-[10%] flex justify-center items-center">
                  <span className="pb-1">Or</span>
                </div>

                <div className="w-[45%] bg-slate-700 h-[1px]"></div>
              </div>

              <div className="flex justify-around">
                <div className="flex justify-center items-center gap-3">
                  <div
                    className="w-40 h-12 flex rounded-md 
                bg-orange-500 shadow-lg hover:shadow-orange-700/50
                justify-center cursor-pointer items-center overflow-hidden
                "
                  >
                    <span className="text-xl text-white">
                      <FaGoogle />
                    </span>
                  </div>
                </div>
                <div className="flex justify-center items-center gap-3 ">
                  <div
                    className="w-40 h-12 flex rounded-md 
                bg-blue-500 shadow-lg hover:shadow-blue-700/50
                justify-center cursor-pointer items-center overflow-hidden
                "
                  >
                    <span className="text-xl text-white">
                      <FaFacebook />
                    </span>
                  </div>
                </div>
              </div>
            </Container>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
}
