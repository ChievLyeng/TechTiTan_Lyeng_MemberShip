import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Typography,
  FormControl,
  InputLabel,
  InputAdornment,
  OutlinedInput,
  IconButton,
  FormHelperText,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useResetPassword } from "../hooks/useResetPassword";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [shownewPassword, setShowNewPassword] = useState(false);
  const [showconPassword, setShowConPassword] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const { resetpassword, isLoading, error } = useResetPassword();
  const navigate = useNavigate();
  const { token } = useParams();
  

  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);

  const handleMouseDownNewPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowConPassword = () => setShowConPassword((show) => !show);

  const handleMouseDownConPassword = (event) => {
    event.preventDefault();
  };

  const handleInputChange = () => {
    
    setIsTyping(true);
    setErrorMessage(""); // Clear the error message
  };
  

  const handleResetpasword = async (e) => {
    e.preventDefault()
    await resetpassword(password, passwordConfirm, token);
  };


  return (
    <>
      <Typography
        variant="h4"
        className="title"
        sx={{ margin: "24px", textAlign: "center" }}
      >
        Reset Password
      </Typography>

      <form onSubmit={handleResetpasword}>
        {/* {errorMessage && !isTyping && (
          <Typography color="error" sx={{ marginBottom: "16px" }}>
            {errorMessage}
          </Typography>
        )} */}
        <FormControl
          fullWidth
          variant="outlined"
          sx={{
            margin: "24px 0",
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                // borderColor: "#82B440",
              },
            "& .MuiInputLabel-root.Mui-focused": {
              //   color: "#82B440",
            },
          }}
        >
          <InputLabel htmlFor="outlined-adornment-password">
            New Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={shownewPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowNewPassword}
                  onMouseDown={handleMouseDownNewPassword}
                  edge="end"
                >
                  {shownewPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="New Password"
            value={password}
            onChange={(e) => {
              handleInputChange();
              setPassword(e.target.value);
            }}
          />
          <FormHelperText id="outlined-adornment-password-helper-text">
            *Required
          </FormHelperText>
        </FormControl>

        <FormControl
          fullWidth
          variant="outlined"
          sx={{
            margin: " 0",
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                // borderColor: "black",
              },
            "& .MuiInputLabel-root.Mui-focused": {
              //   color: "#82B440",
            },
          }}
        >
          <InputLabel htmlFor="outlined-adornment-confirm-password">
            Confirm Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-confirm-password"
            type={showconPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConPassword}
                  onMouseDown={handleMouseDownConPassword}
                  edge="end"
                >
                  {showconPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Confirm Password"
            value={passwordConfirm}
            onChange={(e) => {
              handleInputChange();
              setPasswordConfirm(e.target.value);
            }}
          />
          <FormHelperText id="outlined-adornment-confirm-password-helper-text">
            *Required
          </FormHelperText>
        </FormControl>

        <Button
          sx={{
            marginTop: "24px",
            // backgroundColor: "#82B440",
          }}
          fullWidth
          type="submit"
          variant="contained"
          className="mt-2"
          //   disabled={isLoading}
        >
          Reset Password
        </Button>
      </form>
    </>
  );
};

export default ResetPassword;
