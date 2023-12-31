import { useState, useEffect, Fragment } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "../style/EmailVerify.css";

const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(false);
  const param = useParams();
  const navigate = useNavigate();

  const verifyEmailUrl = async () => {
    try {
      const url = `http://localhost:5173/api/users/${param.id}/verify/${param.token}`;
      const { data } = await axios(url);
      console.log(data);
      setValidUrl(true);
    } catch (err) {
      console.log(err);
      setValidUrl(false);
    }
  };

  useEffect(() => {
    verifyEmailUrl();
  }, [param]);

  const handlClick = () => {
    navigate('/login')
  }

  return (
    <>
      {validUrl ? (
        <Box
          sx={{
            maxWidth: "600px",
            margin: "auto",
          }}
        >
          <Card
            sx={{
              marginTop: "120px",
              paddingTop: "24px",
              paddingBottom: "24px",
            }}
          >
            <Typography
              sx={{ textAlign: "center", fontWeight: "bold" }}
              gutterBottom
              variant="h4"
              component="div"
            >
              Account Activated
            </Typography>
            <CardMedia
              sx={{
                height: 100,
                width: 100,
                objectFit: "cover",
                margin: "16px auto",
              }}
              image="https://cdn-icons-png.flaticon.com/512/6364/6364343.png"
              title="Green Iguana"
            />

            <CardContent>
              <Typography
                sx={{ textAlign: "center", fontSize: "16px" }}
                variant="body2"
                color="text.secondary"
              >
                Thank you , your email has been verified. Your account is now
                active.
              </Typography>
              <Typography
                sx={{
                  textAlign: "center",
                  marginBottom: "24px",
                  fontSize: "16px",
                }}
                variant="body2"
                color="text.secondary"
              >
                Pleas use the link below to login to your account.
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                onClick={handlClick}
                sx={{ margin: "auto", marginBottom: "24px" }}
                variant="contained"
              >
                LOGIN TO YOUR ACCOUNT
              </Button>
            </CardActions>

            <Typography
              sx={{ textAlign: "center", fontSize: "16px" }}
              variant="body2"
              color="text.secondary"
            >
              Thank you for choosing our application.
            </Typography>
          </Card>
        </Box>
      ) : (
        <h1>404 Not Found</h1>
      )}
    </>
  );
};

export default EmailVerify;
