import StickyFooter from "../components/StickyFooter";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Link, useNavigate } from "react-router-dom";
import "../style/checkEmail.css";

const CheckEmail = () => {
  const navigate = useNavigate();

  const handlClick = () => {
    navigate("/login");
  };

  return (
    <>
      {/* <Container maxWidth="sm">
        <Box
          sx={{
            background: "white",
            border: "1px solid black",
            width: "600px",
            marginTop: "120px",
            paddingTop: "36px",
            paddingBottom: "36px",
            borderRadius: "5px",
          }}
        >
          <div className="img-container">
            <img
              className="email-img"
              src="https://cdn-icons-png.flaticon.com/512/9841/9841132.png"
              alt="email-img"
            />
          </div>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "24px",
              // background: "pink",
              width: "600px",
            }}
          >
            <div className="message-container">
              <Typography
                variant="h4"
                sx={{ fontWeight: "bold" }}
              >
                Verify your email address
              </Typography>
              <Typography color="text.secondary">
                We have sent a verification link to your email.
              </Typography>
              <Typography color="text.secondary">
                Check you email and click the link to verify your account.
              </Typography>
            </div>
          </Box>

          <div className="button-container">
            <Button variant="contained">Resend email</Button>
            <Link to="/signup">
              <Button variant="outlined">Back to site</Button>
            </Link>
          </div>
        </Box>
      </Container> */}
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
            Verify your email address
          </Typography>
          <CardMedia
            sx={{
              height: 100,
              width: 100,
              objectFit: "cover",
              margin: "16px auto",
            }}
            image="https://cdn-icons-png.flaticon.com/512/9841/9841132.png"
            title="Green Iguana"
          />

          <CardContent>
            <Typography
              sx={{ textAlign: "center", fontSize: "16px" }}
              variant="body2"
              color="text.secondary"
            >
              We have sent a verification link to your email.
            </Typography>
            <Typography
              sx={{
                textAlign: "center",
                fontSize: "16px",
              }}
              variant="body2"
              color="text.secondary"
            >
              Check you email and click the link to verify your account.
            </Typography>
          </CardContent>
          <div className="button-container">
            <Button variant="contained">Resend email</Button>
            <Link to="/signup">
              <Button variant="outlined">Back to site</Button>
            </Link>
          </div>
          {/* <CardActions>
            <Button
              onClick={handlClick}
              sx={{ margin: "auto", marginBottom: "24px" }}
              variant="contained"
            >
              LOGIN TO YOUR ACCOUNT
            </Button>
          </CardActions> */}
        </Card>
      </Box>
    </>
  );
};

export default CheckEmail;
