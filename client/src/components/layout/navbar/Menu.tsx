import { HamburgerIcon } from "@chakra-ui/icons";
import { IconButton, Menu as ChakraMenu, MenuButton, MenuItem, MenuList, useToast } from "@chakra-ui/react";
import { RouterMenuItem } from "../..";
import { useLogoutMutation } from "../../../hooks";
import { APP_ROUTES } from "../../../navigation";
import { logout } from "../../../utils";

export const Menu = () => {
  const toast = useToast();
  const [logoutUser, { loading }] = useLogoutMutation({
    onCompleted: (data) => {
      logout();
      toast({ title: data.logout, status: "success", isClosable: true });
    },
  });
  const onLogout = () => logoutUser();
  return (
    <ChakraMenu>
      <MenuButton
        as={IconButton}
        aria-label="open navigation menu"
        size="md"
        fontSize="lg"
        variant="ghost"
        color="current"
        icon={<HamburgerIcon />}
      />
      <MenuList>
        <RouterMenuItem to={APP_ROUTES.dashboard}>Dashboard</RouterMenuItem>
        <MenuItem>Profile</MenuItem>
        <MenuItem onClick={onLogout} isDisabled={loading}>
          Logout
        </MenuItem>
      </MenuList>
    </ChakraMenu>
  );
};
