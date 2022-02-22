import { ApolloError } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";

interface UseMutationFeedbackEffectProps {
  data: any;
  error: ApolloError | undefined;
  success: {
    title: string;
    description?: string;
  };
}

export function useMutationFeedbackEffect({
  data,
  error,
  success: { title, description },
}: UseMutationFeedbackEffectProps) {
  const toast = useToast();
  return useEffect(() => {
    if (error) {
      toast({
        title: error.message,
        status: "error",
      });
    }
    if (data) {
      toast({
        title,
        description,
        status: "success",
      });
    }
  }, [data, description, error, title, toast]);
}
