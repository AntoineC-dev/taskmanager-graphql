import { ButtonGroup, HStack, Spacer, StackProps } from "@chakra-ui/react";
import { APP_ROUTES } from "../../../navigation";
import { FaHome } from "react-icons/fa";
import { useIsAuthenticated } from "../../../hooks";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { RouterButton } from "../../router";
import { Menu } from "./Menu";

export const Navbar = (props: StackProps) => {
  const isAuthenticated = useIsAuthenticated();
  return (
    <HStack {...props}>
      <ButtonGroup variant="ghost" flexGrow={1}>
        <RouterButton to={APP_ROUTES.home} leftIcon={<FaHome />}>
          TaskManager
        </RouterButton>
        <Spacer />
        {isAuthenticated ? (
          <Menu />
        ) : (
          <>
            <RouterButton to={APP_ROUTES.register}>Register</RouterButton>
            <RouterButton to={APP_ROUTES.login}>Login</RouterButton>
          </>
        )}
      </ButtonGroup>
      <ColorModeSwitcher />
    </HStack>
  );
};
