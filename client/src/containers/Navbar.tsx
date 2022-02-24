import { Button, ButtonGroup, Divider, HStack, Spacer, StackProps } from "@chakra-ui/react";
import { ColorModeSwitcher, RouterButton } from "../components";
import { APP_ROUTES } from "../navigation";
import { FaHome } from "react-icons/fa";
import { useIsAuthenticated } from "../hooks";

export const Navbar = (props: StackProps) => {
  const isAuthenticated = useIsAuthenticated();
  return (
    <HStack {...props}>
      <ButtonGroup variant="ghost" size="sm" flexGrow={1}>
        <RouterButton to={APP_ROUTES.home} leftIcon={<FaHome />}>
          Home
        </RouterButton>
        <Spacer />
        {isAuthenticated ? (
          <>
            <RouterButton to={APP_ROUTES.dashboard}>Dashboard</RouterButton>
            <Button>Logout</Button>
          </>
        ) : (
          <>
            <RouterButton to={APP_ROUTES.register}>Register</RouterButton>
            <RouterButton to={APP_ROUTES.login}>Login</RouterButton>
          </>
        )}
      </ButtonGroup>
      <Divider h="6" orientation="vertical" />
      <ColorModeSwitcher />
    </HStack>
  );
};
