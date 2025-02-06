import { resetMessage } from "../slices/cartSlice";
import { resetMessageRequest } from "../slices/requestSlice";
import { resetMessageUser } from "../slices/userSlice";
import { AppDispatch } from "../store";

export const useResetComponentMessage = (dispacth: AppDispatch) => {
  return () => {
    setTimeout(() => {
      dispacth(resetMessage());
      dispacth(resetMessageUser());
      dispacth(resetMessageRequest());
    }, 2000);
  };
};
