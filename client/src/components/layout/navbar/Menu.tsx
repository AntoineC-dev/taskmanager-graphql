import { HamburgerIcon } from "@chakra-ui/icons";
import { IconButton, Menu as ChakraMenu, MenuButton, MenuGroup, MenuItem, MenuList } from "@chakra-ui/react";

export const Menu = () => {
  return (
    <ChakraMenu>
      <MenuButton as={IconButton} aria-label="Navigation" icon={<HamburgerIcon />} />
      <MenuList>
        <MenuGroup title="Tasks">
          <MenuItem>Dashboard</MenuItem>
          <MenuItem>Archive</MenuItem>
        </MenuGroup>
        <MenuGroup title="Profile">
          <MenuItem>Profile</MenuItem>
        </MenuGroup>
      </MenuList>
    </ChakraMenu>
  );
};
