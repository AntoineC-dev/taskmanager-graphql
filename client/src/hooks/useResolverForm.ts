import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormProps } from "react-hook-form";
import { AnyZodObject, ZodEffects } from "zod";

interface UseResolverFormProps<FormValues> extends Omit<UseFormProps<FormValues>, "resolver"> {
  schema: ZodEffects<AnyZodObject> | AnyZodObject;
}

export function useResolverForm<FormValues>({ schema, mode, ...rest }: UseResolverFormProps<FormValues>) {
  return useForm({
    resolver: zodResolver(schema),
    mode: mode ?? "onChange",
    ...rest,
  });
}
