import { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForgotPassword } from "../hooks/useForgotPassword";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Box from "@mui/material/Box";
import { CircularProgress, Snackbar } from "@mui/material";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const { forgotpassword, isLoading, error } = useForgotPassword();
  const [email, setEmail] = useState("");

  const handleForgotPassword = async () => {
    await forgotpassword(email).finally(setSuccess(true));
  };

  return (
    <Container>
      <Box sx={{ padding: "24px", maxWidth: "400px", margin: "auto" }}>
        <Typography variant="h4" className="title" sx={{ margin: "24px" }}>
          Forgot Password
        </Typography>
        <TextField
          fullWidth
          label="Email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          helperText="Enter your email address"
          margin="normal"
          variant="outlined"
        />
        <Button
          type="button"
          variant="contained"
          onClick={handleForgotPassword}
          // disabled={isLoading}
          fullWidth
          sx={{ backgroundColor: "#82B440", margin: "24px 0" }}
        >
          Send Reset Link

          {isLoading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Add Product"
        )}

        </Button>

        
        {success && <Alert
          severity="success"
        >
          <AlertTitle>Success</AlertTitle>
          Link has sent to your emaill successfully ! —{" "}
          <strong>check it out!</strong>
        </Alert>}

        <Snackbar
          open={success}
          autoHideDuration={6000}
          onClose={() => setSuccess(false)}
          message="Product added successfully!"
        />
      </Box>
    </Container>
  );
};

export default ForgotPassword;
