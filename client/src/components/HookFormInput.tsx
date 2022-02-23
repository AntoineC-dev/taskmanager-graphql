import { EditIcon, EmailIcon, LockIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  forwardRef,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { Path, useController, UseControllerProps } from "react-hook-form";

type HookFormInputTypes = "text" | "email" | "password";

const renderInputIcon = (type: HookFormInputTypes) => {
  if (type === "text") return <EditIcon />;
  if (type === "email") return <EmailIcon />;
  if (type === "password") return <LockIcon />;
};

type HookFormInputProps<T> = {
  label?: string;
  placeholder?: string;
  type?: HookFormInputTypes;
} & UseControllerProps<T, Path<T>>;

const ChakraInput = forwardRef(({ type, ...props }, ref) => {
  const icon = renderInputIcon(type);
  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none" children={icon} />
      <Input ref={ref} type={type} autoComplete={type === "password" ? "on" : "off"} {...props} />
    </InputGroup>
  );
});

export function HookFormInput<T>({ label, placeholder, type = "text", ...rest }: HookFormInputProps<T>) {
  const { field, fieldState } = useController(rest);
  const formLabel = label ?? `${field.name.charAt(0).toUpperCase()}${field.name.slice(1)}`;
  const inputPlaceholder = placeholder ?? `Enter your ${field.name} here...`;
  return (
    <FormControl isInvalid={fieldState.invalid}>
      <FormLabel htmlFor={field.name}>{formLabel} :</FormLabel>
      <ChakraInput placeholder={inputPlaceholder} type={type} {...field} />
      <FormErrorMessage>{fieldState.error?.message}</FormErrorMessage>
    </FormControl>
  );
}
