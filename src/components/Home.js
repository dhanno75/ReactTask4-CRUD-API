import React from "react";
import { Container, Grid } from "@mui/material";
import AllUsers from "./AllUsers";

const Home = () => {
  return (
    <>
      <Container sx={{ marginY: 5 }}>
        <Grid container spacing={5}>
          <AllUsers />
        </Grid>
      </Container>
    </>
  );
};

export default Home;
