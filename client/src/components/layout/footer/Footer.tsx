import { Link, Text, TextProps } from "@chakra-ui/react";

export const Footer = (props: TextProps) => {
  return (
    <Text {...props}>
      Antoine Cheminat -{" "}
      <Link href="https://github.com/AntoineC-dev" isExternal textDecor="underline">
        Github
      </Link>{" "}
      - 2022
    </Text>
  );
};
