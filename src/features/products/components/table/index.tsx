import { useState } from "react";
import SweetAlert from "sweetalert2";
import Table from "../../../../components/table";
import ProductModel from "../../product.model";
import EditProductModal from "../modals/edit-product-modal";
import productsController from "../../products.controller";
import MESSAGES from "../../../../common/constants/messages.const";

interface ProductsListProps {
  products: ProductModel[];
  isLoading?: boolean;
  onDeleteProduct?: () => void;
  onEditProduct?: () => void;
}

const columns = [
  { key: "image", label: "Imagem", isImage: true },
  { key: "name", label: "Nome do produto" },
  { key: "reference", label: "Referência" },
  { key: "sellingPriceFormatted", label: "Valor de venda" },
  { key: "manufacturer", label: "Fabricante" },
  { key: "stockFormatted", label: "Estoque" },
];

export default function ProductsTable({
  products,
  isLoading,
  onDeleteProduct,
  onEditProduct,
}: ProductsListProps) {
  const [editProduct, setEditProduct] = useState<ProductModel>(
    new ProductModel({}),
  );
  const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);

  function handleOpenEditProductModal(open: boolean) {
    setIsEditProductModalOpen(open);
  }

  return (
    <>
      <EditProductModal
        product={editProduct}
        open={isEditProductModalOpen}
        close={() => handleOpenEditProductModal(false)}
        onEditProduct={onEditProduct}
      />

      <Table
        columns={columns}
        data={products.map((product) => product.toViewObject())}
        isLoading={isLoading}
        handleEdit={(productItem) => {
          const product = new ProductModel(productItem);
          setEditProduct(product);
          handleOpenEditProductModal(true);
        }}
        handleDelete={async (product) => {
          const success = await productsController.deleteProduct(product.id);
          if (success) {
            SweetAlert.fire(MESSAGES.success);
            onDeleteProduct();
          } else {
            SweetAlert.fire(MESSAGES.error);
          }
        }}
      />
    </>
  );
}
