import SweetAlert from "sweetalert2";
import { Flex, useBreakpointValue } from "@chakra-ui/react";
import Header from "../../../../components/header";
import { ReactNode } from "react";
import BaseForm from "./base-product-form";
import productsController from "../../products.controller";
import MESSAGES from "../../../../common/constants/messages.const";

interface NewProductFormProps {
  onNewProduct: () => void;
}

const Container: React.FC<{ children: ReactNode }> = ({ children }) => {
  const isMobile = useBreakpointValue({ base: true, lg: false });

  return (
    <Flex
      direction="column"
      h="max-content"
      maxH="90vh"
      w="80vw"
      p={isMobile ? 4 : 12}
      bgColor="white"
      overflow="auto"
    >
      {children}
    </Flex>
  );
};

export default function NewProductForm({ onNewProduct }: NewProductFormProps) {
  return (
    <Container>
      <Header title="Cadastrar Produto" />
      <BaseForm
        onSave={async (product) => {
          const success = await productsController.saveProduct(product);
          if (success) {
            SweetAlert.fire(MESSAGES.success);
            onNewProduct();
          } else {
            SweetAlert.fire(MESSAGES.error);
          }
        }}
      />
    </Container>
  );
}
