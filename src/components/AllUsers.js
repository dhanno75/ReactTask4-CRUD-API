import { useState, useEffect } from "react";
import {
  Paper,
  Grid,
  Typography,
  Box,
  createTheme,
  ThemeProvider,
  Button,
  ButtonGroup,
} from "@mui/material";
import FlagIcon from "@mui/icons-material/Flag";
import EmailIcon from "@mui/icons-material/Email";
import DeleteIcon from "@mui/icons-material/Delete";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const theme = createTheme({
  components: {
    MuiTypography: {
      variants: [
        { props: { variant: "body2" }, style: { fontSize: 11 } },
        { props: { variant: "body3" }, style: { fontSize: 9 } },
      ],
    },
  },
});

const AllUsers = () => {
  const [users, setUser] = useState([]);
  const navigate = useNavigate();

  const getUsers = async () => {
    try {
      const data = await fetch(
        "https://6375bd527e93bcb006b86ba6.mockapi.io/users"
      );
      const user = await data.json();
      setUser(user);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  // Delete
  const handleDelete = async (id) => {
    try {
      const data = await fetch(
        `https://6375bd527e93bcb006b86ba6.mockapi.io/users/${id}`,
        {
          method: "DELETE",
        }
      );
      await data.json();
      getUsers();
      toast.warn("User deleted!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {users.map((user) => {
        return (
          <Grid item xs={3} md={3} key={user.id}>
            <ThemeProvider theme={theme}>
              <Paper elevation={3}>
                <img src={user.image} alt="someImage" className="img" />

                <Box
                  sx={{
                    padding: 1,
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    component="h2"
                    className="underline"
                  >
                    {user.name}
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <FlagIcon sx={{ width: 15 }} color="primary" />
                    <Typography variant="body2" component="p" marginLeft={0.5}>
                      {user.country}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                    marginTop={2}
                  >
                    <EmailIcon sx={{ width: 18 }} color="success" />
                    <ChevronRightIcon
                      sx={{ width: 12.5 }}
                      marginLeft={0.5}
                      color="action"
                    />
                    <Typography variant="body2" component="p" marginLeft={1.5}>
                      <a href="#!" color="disabled">
                        {user.email}
                      </a>
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      component="h3"
                      marginTop={0}
                    >
                      Company:
                      <span>&nbsp;{user.company}</span>
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                    marginTop={1}
                  >
                    <ButtonGroup
                      variant="contained"
                      aria-label="outlined primary button group"
                      color="primary"
                    >
                      <Button
                        startIcon={<RemoveRedEyeIcon />}
                        sx={{ fontSize: "10px" }}
                        onClick={() =>
                          navigate(`/action/${user.id}`, {
                            state: { isView: "true" },
                          })
                        }
                      >
                        View
                      </Button>
                    </ButtonGroup>
                    <ButtonGroup
                      variant="contained"
                      aria-label="outlined primary button group"
                      color="secondary"
                    >
                      <Button
                        startIcon={<EditIcon />}
                        sx={{
                          fontSize: "10px",
                          backgroundColor: "#ffd642",
                          color: "#333",
                        }}
                        onClick={() =>
                          navigate(`/action/${user.id}`, {
                            state: { isView: "false" },
                          })
                        }
                      >
                        Edit
                      </Button>
                    </ButtonGroup>
                    <ButtonGroup
                      variant="contained"
                      aria-label="outlined primary button group"
                      color="error"
                    >
                      <Button
                        startIcon={<DeleteIcon />}
                        sx={{ fontSize: "10px" }}
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </Button>
                    </ButtonGroup>
                  </Box>
                </Box>
              </Paper>
            </ThemeProvider>
          </Grid>
        );
      })}
    </>
  );
};

export default AllUsers;
