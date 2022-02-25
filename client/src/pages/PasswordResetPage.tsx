import { Button, Center, Heading, useToast, VStack } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { HookFormInput } from "../components";
import { useResetPasswordMutation, useResolverForm } from "../hooks";
import { APP_ROUTES } from "../navigation";
import { PasswordFormInput, passwordFormSchema } from "../validators";

export const PasswordResetPage = () => {
  const { id, passwordResetCode } = useParams();
  const toast = useToast();
  const navigate = useNavigate();
  const { control, handleSubmit } = useResolverForm<PasswordFormInput>({
    schema: passwordFormSchema,
    defaultValues: { password: "", passwordConfirmation: "" },
  });
  const [handleResetPassword, { loading }] = useResetPasswordMutation({
    onCompleted: ({ resetPassword }) => {
      toast({ title: resetPassword, status: "success", isClosable: true });
      navigate(APP_ROUTES.login);
    },
  });

  const onSubmit = (data: PasswordFormInput) => {
    const variables = { id: id!, password: data.password, passwordResetCode: passwordResetCode! };
    handleResetPassword({ variables });
  };

  return (
    <Center h="100vh">
      <VStack as="form" maxW="container.sm" w="100%" onSubmit={handleSubmit(onSubmit)} spacing={12}>
        <Heading size="lg">Choose a new password</Heading>
        <HookFormInput control={control} name="password" type="password" />
        <HookFormInput
          control={control}
          name="passwordConfirmation"
          type="password"
          placeholder="Confirm your password here..."
        />
        <Button type="submit" isDisabled={loading}>
          Reset password
        </Button>
      </VStack>
    </Center>
  );
};
