import { Button, Code, Heading, useToast, VStack } from "@chakra-ui/react";
import { RegisterFormInput, registerFormSchema } from "../validators";
import { HookFormInput } from "../components";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../navigation";
import { useRegisterMutation, useResolverForm } from "../hooks";

export const RegisterPage = () => {
  const { control, handleSubmit } = useResolverForm<RegisterFormInput>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    schema: registerFormSchema,
  });
  const navigate = useNavigate();
  const toast = useToast();
  const [registerUser, { loading }] = useRegisterMutation({
    onCompleted: ({ register }) => {
      toast({
        title: "Account created",
        description: register,
        status: "success",
        isClosable: true,
      });
      navigate(APP_ROUTES.login);
    },
  });
  const onSubmit = ({ passwordConfirmation, ...rest }: RegisterFormInput) => {
    registerUser({ variables: rest });
  };

  return (
    <VStack maxW="container.sm" w="100%" justifySelf="center" spacing={4}>
      <Heading>Create New Account</Heading>
      <Code fontSize="md" px="2">
        GQLMutation: REGISTER_MUTATION
      </Code>
      <VStack as="form" w="100%" onSubmit={handleSubmit(onSubmit)}>
        <HookFormInput control={control} name="username" />
        <HookFormInput control={control} name="email" type="email" />
        <HookFormInput control={control} name="password" type="password" />
        <HookFormInput
          control={control}
          name="passwordConfirmation"
          type="password"
          placeholder="Confirm your password here..."
        />
        <Button type="submit" disabled={loading}>
          Register Now
        </Button>
      </VStack>
    </VStack>
  );
};
