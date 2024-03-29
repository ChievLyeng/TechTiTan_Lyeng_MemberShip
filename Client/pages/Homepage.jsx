import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import Layout from "../components/Layout";


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const Homepage = () => {
  const [data, setData] = useState();
  const user = useAuthContext();
  const token = user.user?.token || "";

  // console.log("aaaa",token)
  // console.log(typeof(token))

  const getUser = async () => {
    try {
      const response = await axios.get(`https://techtitan-lyeng-membership.onrender.com/api/v1/users`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      const userData = response.data?.data?.users || [];
      setData(userData);

      return response.data.data.users;
    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);


  return (
    <Layout>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <main>
          {/* Hero unit */}
          <Box
            sx={{
              bgcolor: "background.paper",
              pt: 8,
              pb: 6,
            }}
          >
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
              >
                User List
              </Typography>
              
            </Container>
          </Box>
          <Container sx={{ py: 8 }} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {data &&
                data.map((user) => (
                  <Grid item key={user._id} xs={12} sm={6} md={4}>
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <CardMedia
                        component="div"
                        sx={{
                          // 16:9
                          pt: "56.25%",
                        }}
                        image="https://source.unsplash.com/random?wallpapers"
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {user.userName}
                        </Typography>
                        <Typography>{user.email}</Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small">View</Button>
                        <Button size="small">Edit</Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </Container>
        </main>

        {/* End footer */}
      </ThemeProvider>
    </Layout>
  );
};

export default Homepage;
