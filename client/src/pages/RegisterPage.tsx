import { Button, Code, Heading, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormInput, registerFormSchema } from "../validators";
import { HookFormInput } from "../components";
import { useMutation } from "@apollo/client";
import { RegisterData, RegisterVariables, REGISTER_MUTATION } from "../graphql";
import { useMutationFeedbackEffect } from "../hooks";

export const RegisterPage = () => {
  const { control, handleSubmit, reset } = useForm<RegisterFormInput>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    resolver: zodResolver(registerFormSchema),
    mode: "onChange",
  });
  const [registerUser, { data, error, loading }] = useMutation<RegisterData, RegisterVariables>(REGISTER_MUTATION);
  useMutationFeedbackEffect({
    data,
    error,
    success: { title: "Account Created", description: "Please verify your email" },
  });
  const onSubmit = (formData: RegisterFormInput) => {
    const { passwordConfirmation, ...rest } = formData;
    registerUser({
      variables: rest,
    }).then(({ data }) => {
      if (data) {
        reset();
        // TODO: navigate to login page
        console.log("Navigate to login page");
      }
    });
  };

  return (
    <VStack as="form" maxW="container.sm" w="100%" justifySelf="center" spacing={4} onSubmit={handleSubmit(onSubmit)}>
      <Heading>Create New Account</Heading>
      <Code fontSize="md" px="2">
        GQLMutation: REGISTER_MUTATION
      </Code>
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
  );
};
