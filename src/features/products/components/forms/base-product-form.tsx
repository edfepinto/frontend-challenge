import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Button,
  Flex,
  Box,
  useBreakpointValue,
} from "@chakra-ui/react";
import Input from "../../../../components/input";
import ProductModel from "../../product.model";

interface BaseProductFormProps {
  initialProduct?: ProductModel;
  onSave: (product: ProductModel) => void;
}

export default function BaseProductForm({
  initialProduct,
  onSave,
}: BaseProductFormProps) {
  const emptyProduct = new ProductModel({});
  const [product, setProduct] = useState(initialProduct || emptyProduct);
  const isMobile = useBreakpointValue({ base: true, lg: false });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const updatedProduct = new ProductModel({
      ...product.getLeanObject(),
      [name]: value,
    });
    setProduct(updatedProduct);
  };

  const handleSave = () => {
    onSave(product);
  };

  return (
    <Box border="1px" borderColor="#A0AEC0" borderRadius="lg" p={6}>
      <Flex mb="4" flexDirection={isMobile ? "column" : "row"}>
        <FormControl flex={1} mr="4">
          <FormLabel>Nome</FormLabel>
          <Input
            name="name"
            value={product.name}
            onChange={handleInputChange}
            mb={isMobile ? 4 : 0}
          />
        </FormControl>
        <FormControl flex={1} mr="4">
          <FormLabel>Valor de Venda</FormLabel>
          <Input
            name="sellingPrice"
            value={product.sellingPrice}
            onChange={handleInputChange}
            mb={isMobile ? 5 : 0}
          />
        </FormControl>
        <FormControl flex={1}>
          <FormLabel>Referência</FormLabel>
          <Input
            name="reference"
            value={product.reference}
            onChange={handleInputChange}
            mb={isMobile ? 2 : 0}
          />
        </FormControl>
      </Flex>

      <Flex mb="4" flexDirection={isMobile ? "column" : "row"}>
        <FormControl flex={1} mr="4">
          <FormLabel>Unidade de Medida</FormLabel>
          <Input
            name="unitOfMeasurement"
            value={product.unitOfMeasurement}
            onChange={handleInputChange}
            mb={isMobile ? 4 : 0}
          />
        </FormControl>
        <FormControl flex={1} mr="4">
          <FormLabel>Fabricante</FormLabel>
          <Input
            name="manufacturer"
            value={product.manufacturer}
            onChange={handleInputChange}
            mb={isMobile ? 4 : 0}
          />
        </FormControl>
        <FormControl flex={1}>
          <FormLabel>Estoque</FormLabel>
          <Input
            name="stock"
            value={product.stock}
            onChange={handleInputChange}
            mb={isMobile ? 2 : 0}
          />
        </FormControl>
      </Flex>

      <Flex
        justifyContent="flex-end"
        flex={1}
        flexDirection={isMobile ? "column" : "row"}
      >
        <FormControl flex={2} mr={8}>
          <FormLabel>URL da Imagem do Produto</FormLabel>
          <Input
            name="image"
            value={product.image}
            onChange={handleInputChange}
            mb={isMobile ? 4 : 0}
          />
        </FormControl>

        <Flex
          alignSelf={isMobile ? "center" : "flex-end"}
          justifyContent="flex-end"
          flex={0.94}
        >
          <Button colorScheme="green" onClick={handleSave}>
            Salvar
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}
