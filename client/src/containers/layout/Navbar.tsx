import { Button, ButtonGroup, Divider, HStack, Spacer, StackProps, useToast } from "@chakra-ui/react";
import { ColorModeSwitcher, RouterButton } from "../../components";
import { APP_ROUTES } from "../../navigation";
import { FaHome } from "react-icons/fa";
import { useIsAuthenticated, useLogoutMutation } from "../../hooks";
import { logout } from "../../utils";

export const Navbar = (props: StackProps) => {
  const isAuthenticated = useIsAuthenticated();
  const toast = useToast();
  const [logoutUser, { loading }] = useLogoutMutation({
    onCompleted: (data) => {
      logout();
      toast({ title: data.logout, status: "success", isClosable: true });
    },
  });
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
            <Button onClick={() => logoutUser()} isDisabled={loading}>
              Logout
            </Button>
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
