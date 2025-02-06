import { ReactNode } from "react";
import "./Modal.css";

interface Props {
  children: ReactNode;
}

const Modal = ({ children }: Props) => {
  return (
    <div className="modal">
      <div className="background-modal"></div>
      <div className="content-modal">{children}</div>
    </div>
  );
};

export default Modal;
