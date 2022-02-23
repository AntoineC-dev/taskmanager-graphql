import { Box, Center, Spinner } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

export const VerifyPage = () => {
  const params = useParams<{ id: string; verificationCode: string }>();
  console.log(params);
  return (
    <Box minH="100vh">
      <Center>
        <Spinner size="xl" thickness="4px" speed="0.8s" />
      </Center>
    </Box>
  );
};
