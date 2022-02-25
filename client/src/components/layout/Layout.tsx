import { Grid, GridItem } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./navbar/Navbar";
import { Footer } from "./footer/Footer";

export const Layout = () => {
  return (
    <Grid minH="100vh" templateRows="auto 1fr auto" p={4} gap={8}>
      <GridItem rowSpan={1}>
        <Navbar alignSelf="start" />
      </GridItem>
      <GridItem rowSpan={1}>
        <Outlet />
      </GridItem>
      <GridItem rowSpan={1}>
        <Footer align="center" />
      </GridItem>
    </Grid>
  );
};
