import Modal from "../../../../components/modal";
import NewProductForm from "../../components/forms/new-product-form";

interface NewProductModalProps {
  open: boolean
  close: () => void
  onNewProduct?: () => void
}

export default function NewProductModal({ open, close, onNewProduct }: NewProductModalProps) {
  return (
    <Modal isOpen={open} onClose={close}>
      <NewProductForm onNewProduct={() => {
        onNewProduct();
        close();
      }} />
    </Modal>
  );
}
