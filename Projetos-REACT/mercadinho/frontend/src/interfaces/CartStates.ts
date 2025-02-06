import IProdCart from "./ProdCart";

export default interface ICartStates {
  cartProds: IProdCart[];
  loading: boolean;
  error: string | null;
  success: boolean;
  message: string | null;
}
