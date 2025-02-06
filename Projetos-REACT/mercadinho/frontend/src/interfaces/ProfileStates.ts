import IProfile from "./Profile";

export default interface IProfileStates {
  user: IProfile | null;
  error: string;
  success: boolean;
  loading: boolean;
  message: string | null;
}
