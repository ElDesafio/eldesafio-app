import { Button } from "@chakra-ui/react";
import { useIsSubmitting } from "remix-validated-form";

export const FormSubmitButton = () => {
  const isSubmitting = useIsSubmitting();
  return (
    <Button
      type="submit"
      colorScheme="blue"
      disabled={isSubmitting}
      isLoading={isSubmitting}
    >
      {isSubmitting ? "Enviando..." : "Enviar"}
    </Button>
  );
};
