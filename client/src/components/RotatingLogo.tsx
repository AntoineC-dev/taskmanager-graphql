import { chakra, keyframes, ImageProps, forwardRef, usePrefersReducedMotion } from "@chakra-ui/react";
import { graphqlPNG } from "../assets";

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const RotatingLogo = forwardRef<ImageProps, "img">((props, ref) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const animation = prefersReducedMotion ? undefined : `${spin} infinite 20s linear`;

  return <chakra.img animation={animation} src={graphqlPNG} ref={ref} {...props} />;
});
