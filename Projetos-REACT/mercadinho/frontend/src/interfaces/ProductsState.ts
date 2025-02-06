import IProduct from "./Product";

export default interface IProductsState {
  products: IProduct[];
  error: string;
  success: boolean;
  loading: boolean;
  message: string | null;
}
