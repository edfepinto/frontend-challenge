import Axios from "axios";
import * as apiConfig from "../../config/api-config";

export interface ApiProduct {
  id: number;
  nome: string;
  valorVenda: string | number;
  referencia: string;
  unidadeMedida: string;
  fabricante: string;
  estoque: number;
  imagemProduto: string;
  createdAt: string;
}

export interface ApiSuccessResponse {
  statusCode: number;
  message: string;
}

const axios = Axios.create({
  baseURL: apiConfig.baseUrl,
});

const apiDataProvider = {
  getProductsList: async (): Promise<ApiProduct[]> => {
    const response = await axios.get<ApiProduct[]>(
      apiConfig.resources.products,
    );
    return response.data;
  },

  getOneProduct: async (id: number): Promise<ApiProduct> => {
    const response = await axios.get<ApiProduct>(
      apiConfig.resources.oneProduct.replace(":id", String(id)),
    );
    return response.data;
  },

  createProduct: async (
    data: ApiProduct | Partial<ApiProduct>,
  ): Promise<ApiSuccessResponse> => {
    const response = await axios.post<ApiSuccessResponse>(
      apiConfig.resources.products,
      data,
    );
    return response.data;
  },

  updateProduct: async (
    id: number,
    data: Partial<ApiProduct>,
  ): Promise<ApiSuccessResponse> => {
    const response = await axios.patch<ApiSuccessResponse>(
      apiConfig.resources.oneProduct.replace(":id", String(id)),
      data,
    );
    return response.data;
  },

  deleteProduct: async (id: number): Promise<ApiSuccessResponse> => {
    const response = await axios.delete<ApiSuccessResponse>(
      apiConfig.resources.deleteProduct.replace(":id", String(id)),
    );
    return response.data;
  },

  getProductCount: async (): Promise<number> => {
    const response = await axios.get<number>(apiConfig.resources.count);
    return response.data;
  },

  getProductPagination: async (page: number): Promise<ApiProduct[]> => {
    const response = await axios.get<ApiProduct[]>(
      apiConfig.resources.pagination.replace(":page", String(page)),
    );
    return response.data;
  },
};

export default apiDataProvider;
