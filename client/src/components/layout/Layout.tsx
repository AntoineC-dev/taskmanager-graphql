import { Box, Grid } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./navbar/Navbar";

export const Layout = () => {
  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <Navbar alignSelf="start" />
        <Outlet />
      </Grid>
    </Box>
  );
};
