import { Stack, StackProps } from "@chakra-ui/react";
import React from "react";

export function FormStack(props: StackProps) {
  return (
    <Stack
      direction={{ base: "column", lg: "row" }}
      width="full"
      spacing="6"
      {...props}
    >
      {props.children}
    </Stack>
  );
}
