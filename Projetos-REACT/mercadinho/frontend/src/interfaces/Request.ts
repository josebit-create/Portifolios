import IProdCart from "./ProdCart";

export default interface IRequest {
  _id?: string;
  requestName: string | undefined;
  requestProds: IProdCart[];
  requestMethodPayment: string | undefined;
  requestAddress: {
    cep: string | undefined;
    road: string | undefined;
    homeNumber: string | undefined;
    neighborhood: string | undefined;
    city: string | undefined;
  };
  requestSituation: string;
  userId: string | undefined;
}
