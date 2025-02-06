import IRequest from "./Request";

export default interface IInitialStatesRequestSlice {
  requests: IRequest[] | undefined;
  request: IRequest | null;
  error: string;
  success: boolean;
  loading: boolean;
  message: string | null;
}
