import {
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  TextField,
  Button,
  Typography,
  FormHelperText,
  CircularProgress,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Controller } from "react-hook-form";
import { Space } from "@local/common";
import {
  Container,
  LoginBox,
  CustomPaper,
  CenterBox,
} from "./LoginForm.styles";
import { useLoginForm } from "./LoginForm.hook";

const LoginForm = () => {
  const {
    control,
    errors,
    showPassword,
    onSubmit,
    handleSubmit,
    handleMouseDownPassword,
    toggleShowPassword,
    loginError,
    loading,
  } = useLoginForm();

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CustomPaper>
          {loading ? (
            <CenterBox>
              <CircularProgress />
            </CenterBox>
          ) : null}
          <LoginBox>
            <Typography variant="h4">Login</Typography>
            <Space height={5} />
            <Typography variant="body2">
              Use your credits for admin panel
            </Typography>
            <Space height={20} />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="text"
                  variant="outlined"
                  label="Email"
                  error={!!errors?.email}
                  helperText={errors?.email?.message ?? ""}
                />
              )}
            ></Controller>
            <Space height={20} />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <FormControl variant="outlined">
                  <InputLabel>Password</InputLabel>
                  <OutlinedInput
                    {...field}
                    type={showPassword ? "text" : "password"}
                    error={!!errors?.password}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={toggleShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    labelWidth={70}
                  />
                  <FormHelperText error>
                    {errors?.password?.message}
                  </FormHelperText>
                </FormControl>
              )}
            ></Controller>
            <Space height={20} />
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
            <Space height={20} />
            {loginError.error ? (
              <Typography style={{ textAlign: "center", color: "red" }}>
                {loginError?.message}
              </Typography>
            ) : null}
          </LoginBox>
        </CustomPaper>
      </form>
    </Container>
  );
};

export default LoginForm;
