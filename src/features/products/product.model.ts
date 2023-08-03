import { ApiProduct } from "../../infra/data-service/api-data-provider";

interface Product {
  name?: string;
  sellingPrice?: string;
  reference?: string;
  unitOfMeasurement?: string;
  manufacturer?: string;
  stock?: number;
  image?: string;
  id?: number;
}

export default class ProductModel {
  public name: string;
  public sellingPrice: string;
  public reference: string;
  public unitOfMeasurement: string;
  public manufacturer: string;
  public stock: number;
  public image: string;
  public id?: number;

  constructor({
    id,
    name,
    sellingPrice,
    reference,
    unitOfMeasurement,
    manufacturer,
    stock,
    image,
  }: Product) {
    this.id = id;
    this.name = name;
    this.sellingPrice = sellingPrice;
    this.reference = reference;
    this.unitOfMeasurement = unitOfMeasurement;
    this.manufacturer = manufacturer;
    this.stock = stock;
    this.image = image;
  }

  toViewObject() {
    return {
      id: this.id,
      name: this.name,
      sellingPrice: this.sellingPrice,
      reference: this.reference,
      unitOfMeasurement: this.unitOfMeasurement,
      manufacturer: this.manufacturer,
      stock: this.stock,
      image: this.image,
      stockFormatted: `${this.stock} ${this.unitOfMeasurement}`,
      sellingPriceFormatted: `R$ ${parseFloat(this.sellingPrice).toFixed(2)}`,
    };
  }

  toApiProduct(): Partial<ApiProduct> {
    return {
      nome: this.name,
      valorVenda: Number(this.sellingPrice),
      referencia: this.reference,
      unidadeMedida: this.unitOfMeasurement,
      fabricante: this.manufacturer,
      estoque: Number(this.stock),
      imagemProduto: this.image,
    };
  }

  getLeanObject() {
    return {
      id: this.id,
      name: this.name,
      sellingPrice: this.sellingPrice,
      reference: this.reference,
      unitOfMeasurement: this.unitOfMeasurement,
      manufacturer: this.manufacturer,
      stock: this.stock,
      image: this.image,
    };
  }
}
