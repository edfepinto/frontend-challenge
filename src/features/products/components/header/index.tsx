import { Button } from "@chakra-ui/react";
import Header from "../../../../components/header";

interface ProductsHeaderProps {
  onClick: () => void;
}

export default function ProductsHeader({ onClick }: ProductsHeaderProps) {
  return (
    <Header
      title="Produtos"
      buttons={[
        <Button colorScheme="green" onClick={onClick}>
          Adicionar
        </Button>,
      ]}
    />
  );
}
