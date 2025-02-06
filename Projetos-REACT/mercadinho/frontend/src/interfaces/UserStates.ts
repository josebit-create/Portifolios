import IUserLocal from "./UserLocal";

export default interface IUserStates {
  user: IUserLocal | null;
  error: string | null;
  success: boolean;
  loading: boolean;
}
