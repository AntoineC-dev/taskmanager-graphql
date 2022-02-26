import { HamburgerIcon } from "@chakra-ui/icons";
import { IconButton, Menu as ChakraMenu, MenuButton, MenuItem, MenuList, useToast } from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";
import { RouterMenuItem } from "../..";
import { useLogoutMutation } from "../../../hooks";
import { APP_ROUTES } from "../../../navigation";
import { logout as logoutHandler } from "../../../utils";
import { MdDashboard } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";

export const Menu = () => {
  const toast = useToast();
  const [logoutUser, { loading }] = useLogoutMutation({
    onCompleted: ({ logout }) => {
      logoutHandler();
      toast({ ...logout, status: "success", isClosable: true });
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
        <RouterMenuItem to={APP_ROUTES.dashboard} icon={<MdDashboard />}>
          Dashboard
        </RouterMenuItem>
        <MenuItem icon={<SettingsIcon />}>Profile</MenuItem>
        <MenuItem onClick={onLogout} icon={<FiLogOut />} isDisabled={loading}>
          Logout
        </MenuItem>
      </MenuList>
    </ChakraMenu>
  );
};
