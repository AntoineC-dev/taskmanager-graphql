import { Box, Grid } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { ColorModeSwitcher } from "../../components";

export const Layout = () => {
  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <Outlet />
      </Grid>
    </Box>
  );
};
