import { Button, ButtonProps, forwardRef } from "@chakra-ui/react";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface RouterButtonProps extends ButtonProps {
  to: string;
}

export const RouterButton = forwardRef<RouterButtonProps, "button">(({ to, ...rest }, ref) => {
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const isActive = useMemo(() => path === to, [path, to]);
  const onNavigate = () => navigate(to);
  return <Button ref={ref} isActive={isActive} onClick={onNavigate} {...rest} />;
});
