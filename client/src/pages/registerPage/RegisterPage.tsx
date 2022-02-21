import { useEffect } from "react";
import { Button, Code, Heading, useToast, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormInput, registerFormSchema } from "../../validators";
import { HookFormInput } from "../../components";
import { useMutation } from "@apollo/client";
import { REGISTER_MUTATION } from "../../graphql";

export const RegisterPage = () => {
  const { control, handleSubmit } = useForm<RegisterFormInput>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    resolver: zodResolver(registerFormSchema),
    mode: "onChange",
  });
  const [registerUser, { data, error, loading, called, reset }] = useMutation(REGISTER_MUTATION);
  const toast = useToast();
  useEffect(() => {
    if (error) {
      toast({
        title: error.name,
        description: error.message,
        status: "error",
      });
    }
    if (called && data) {
      toast({
        title: "Account created",
        description: "Please verify your email",
        status: "success",
      });
      reset();
    }
  }, [called, data, error, reset, toast]);
  const onSubmit = (formData: RegisterFormInput) => {
    const { passwordConfirmation, ...rest } = formData;
    registerUser({
      variables: rest,
    });
  };

  return (
    <VStack as="form" maxW="container.sm" w="100%" justifySelf="center" spacing={4}>
      <Heading>Create New Account</Heading>
      <Code fontSize="md" px="2">
        GQLMutation: REGISTER
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
      <Button onClick={handleSubmit(onSubmit)} disabled={loading}>
        Register Now
      </Button>
    </VStack>
  );
};
