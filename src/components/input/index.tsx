import { Input as ChakraInput, InputProps } from "@chakra-ui/react";

export default function Input(props: InputProps) {
  return (
    <ChakraInput
      {...props}
      boxShadow="rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;"
    />
  );
}
