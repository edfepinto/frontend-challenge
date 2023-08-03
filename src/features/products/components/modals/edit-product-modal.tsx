import Modal from "../../../../components/modal";
import ProductModel from "../../product.model";
import EditProductForm from "../forms/edit-product-form";

interface EditProductModalProps {
  open: boolean
  close: () => void
  product: ProductModel
  onEditProduct?: () => void;
}

export default function EditProductModal({ open, close, product, onEditProduct }: EditProductModalProps) {
  return (
    <Modal isOpen={open} onClose={close}>
      <EditProductForm editProduct={product} onEditProduct={() => {
        close();
        onEditProduct();
      }}/>
    </Modal>
  );
}
