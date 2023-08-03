import SweetAlert from "sweetalert2";
import { Flex } from "@chakra-ui/react";
import Header from "../../../../components/header";
import { ReactNode } from "react";
import BaseForm from "./base-product-form";
import ProductModel from "../../product.model";
import productsController from "../../products.controller";
import MESSAGES from "../../../../common/constants/messages.const";

interface EditProductFormProps {
  editProduct: ProductModel;
  onEditProduct?: () => void;
}

const Container: React.FC<{ children: ReactNode }> = ({ children }) => (
  <Flex
    direction="column"
    h="max-content"
    w="80vw"
    overflow="auto"
    p={12}
    bgColor="white"
  >
    {children}
  </Flex>
);

export default function EditProductForm({
  editProduct,
  onEditProduct,
}: EditProductFormProps) {
  return (
    <Container>
      <Header title="Editar Produto" />
      <BaseForm
        initialProduct={editProduct}
        onSave={async (product) => {
          const success = await productsController.editProduct(product);
          if (success) {
            SweetAlert.fire(MESSAGES.success);
            onEditProduct();
          } else {
            SweetAlert.fire(MESSAGES.error);
          }
        }}
      />
    </Container>
  );
}
