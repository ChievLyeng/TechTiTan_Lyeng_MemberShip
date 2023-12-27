import { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from '@mui/material/Box';

const ForgotPassword = () => {
  const navigate = useNavigate(); // Replace useHistory with useNavigate
  const [email, setEmail] = useState("");

  const handleForgotPassword = async () => {
    
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
        </Button>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
