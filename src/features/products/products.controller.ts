import { FilterChanges } from ".";
import apiDataProvider, {
  ApiProduct,
} from "../../infra/data-service/api-data-provider";
import ProductModel from "./product.model";

const productsController = {
  fetchProducts: async (): Promise<ProductModel[]> => {
    try {
      const apiProducts: ApiProduct[] = await apiDataProvider.getProductsList();
      const mappedProducts: ProductModel[] = apiProducts.map(
        (apiProduct) =>
          new ProductModel({
            id: apiProduct.id,
            name: apiProduct.nome,
            sellingPrice: String(apiProduct.valorVenda),
            reference: apiProduct.referencia,
            unitOfMeasurement: apiProduct.unidadeMedida,
            manufacturer: apiProduct.fabricante,
            stock: apiProduct.estoque,
            image: apiProduct.imagemProduto,
          }),
      );
      return mappedProducts;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  },

  filterProducts: (filter: FilterChanges, allProducts: ProductModel[]) => {
    const filteredProducts = allProducts.filter((product) => {
      const matches = {
        manufacturer: product.manufacturer
          .toLowerCase()
          .includes(filter.manufacturer.toLowerCase()),
        reference: product.reference
          .toLowerCase()
          .includes(filter.reference.toLowerCase()),
        name: product.name.toLowerCase().includes(filter.name.toLowerCase()),
      };

      const matchTypeCriteria = Object.keys(filter);
      const matchedAllTypeCriteria = matchTypeCriteria.every(
        (criteria) => matches[criteria],
      );

      return matchedAllTypeCriteria;
    });

    return filteredProducts;
  },

  saveProduct: async (product: ProductModel) => {
    try {
      const response = await apiDataProvider.createProduct(
        product.toApiProduct(),
      );
      if (response.statusCode === 200) return true;
    } catch (error) {
      return false;
    }
  },

  deleteProduct: async (productId: number) => {
    try {
      const response = await apiDataProvider.deleteProduct(productId);
      if (response.statusCode === 200) return true;
    } catch (error) {
      return false;
    }
  },

  editProduct: async (product: ProductModel) => {
    try {
      const response = await apiDataProvider.updateProduct(
        product.id,
        product.toApiProduct(),
      );
      if (response.statusCode === 200) return true;
    } catch (error) {
      return false;
    }
  },
};

export default productsController;
