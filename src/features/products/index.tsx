import { ReactNode, useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";

import ProductsTable from "./components/table";
import ProductModel from "./product.model";
import ProductsHeader from "./components/header";
import productsController from "./products.controller";
import ProductsFilter from "./components/filter";
import NewProductModal from "./components/modals/new-product-modal";

export interface FilterChanges {
  name: string;
  reference: string;
  manufacturer: string;
}

interface FilterChange {
  [key: string]: string;
}

const Container: React.FC<{ children: ReactNode }> = ({ children }) => (
  <Flex direction="column" h="100vh" overflow="hidden" p={4}>
    {children}
  </Flex>
);

export default function Products() {
  const [products, setProducts] = useState<ProductModel[]>([]);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterEnabled, setFilterEnabled] = useState(false);
  const [filter, setFilter] = useState<FilterChanges>({
    manufacturer: "",
    reference: "",
    name: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isNewProductModalOpen, setIsEditProductModalOpen] = useState(false);

  useEffect(() => {
    listProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [filter, products]);

  function filterProducts() {
    const isFilterEmpty = Object.values(filter).every(
      (filterValue) => !filterValue,
    );

    if (!isFilterEmpty) {
      const filterResult = productsController.filterProducts(filter, products);
      setFilteredProducts(filterResult);
      setFilterEnabled(true);
    } else {
      setFilterEnabled(false);
    }
  }

  async function listProducts() {
    setIsLoading(true);
    const products = await productsController.fetchProducts();
    setProducts(products);
    setIsLoading(false);
    return products;
  }

  function reloadView() {
    listProducts();
  }

  function handleFilterChange(changes: FilterChange) {
    setFilter((prev) => ({ ...prev, ...changes }));
  }

  function handleFilterReset() {
    setFilteredProducts([]);
    setFilter({
      manufacturer: "",
      reference: "",
      name: "",
    });
    setFilterEnabled(false);
  }

  function handleOpenNewProductModal(open: boolean) {
    return () => setIsEditProductModalOpen(open);
  }

  return (
    <>
      <NewProductModal
        open={isNewProductModalOpen}
        close={handleOpenNewProductModal(false)}
        onNewProduct={reloadView}
      />

      <Container>
        <ProductsHeader onClick={handleOpenNewProductModal(true)} />
        <ProductsFilter
          onFilterChange={handleFilterChange}
          onFilterReset={handleFilterReset}
        />
        <ProductsTable
          products={filterEnabled ? filteredProducts : products}
          isLoading={isLoading}
          onDeleteProduct={reloadView}
          onEditProduct={reloadView}
        />
      </Container>
    </>
  );
}
