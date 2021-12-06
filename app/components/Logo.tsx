import {
  chakra,
  HTMLChakraProps,
  useColorModeValue,
  useToken,
} from "@chakra-ui/react";

export const Logo = (props: HTMLChakraProps<"svg">) => {
  return (
    <chakra.svg
      color={useColorModeValue("blue.500", "blue.300")}
      aria-hidden
      viewBox="0 0 612 792"
      fill="none"
      // h="6"
      flexShrink={0}
      {...props}
    >
      <g>
        <polygon
          fill="#FFFFFF"
          points="303.9,441.3 226.5,426.5 226.5,416.6 303.9,428.7 303.9,332 226.5,345.2 226.5,336.4 303.9,317.2
		303.9,212.1 159.4,296.6 159.4,465.1 303.9,549.6	"
        />
      </g>
      <path
        fill="#FFFFFF"
        d="M460,465.1l-144.5,84.4V212.1L460,296.6V465.1z M392.9,335.6l-9.9-2.5v95.6l9.1-2.2L392.9,335.6z"
      />
    </chakra.svg>
  );
};
