import { Box, Flex, Heading, Spacer } from "@chakra-ui/react";
import { ReactNode } from "react";

interface HeaderProps {
  title: string;
  buttons?: ReactNode[];
}

export default function Header({ title, buttons }: HeaderProps) {
  return (
    <Flex align="center" borderBottom="1px solid #ccc" py={4} mb={4}>
      <Heading as="h2" size="lg">
        {title}
      </Heading>
      <Spacer />
      {buttons &&
        buttons.map((button, index) => <Box key={index}>{button}</Box>)}
    </Flex>
  );
}
