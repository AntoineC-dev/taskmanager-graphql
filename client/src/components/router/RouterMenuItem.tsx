import { forwardRef, MenuItem, MenuItemProps } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface RouterMenuItemProps extends Omit<MenuItemProps, "onClick"> {
  to: string;
}

export const RouterMenuItem = forwardRef<RouterMenuItemProps, "button">(({ to, ...rest }, ref) => {
  const navigate = useNavigate();
  const onNavigate = () => navigate(to);
  return <MenuItem ref={ref} onClick={onNavigate} {...rest} />;
});
