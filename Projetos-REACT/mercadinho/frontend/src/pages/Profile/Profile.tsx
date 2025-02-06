import "./Profile.css";

import PersonImg from "../../img/ui_user_profile_avatar_person_icon_208734.png";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { FormEvent, useEffect, useState } from "react";
import {
  deleteProfile,
  getUserDetails,
  updateProfile,
} from "../../slices/userSlice";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";

import IUserUpdate from "../../interfaces/UserUpdate";

import Modal from "../../components/Modal";
import Message from "../../components/Message";
import {
  deleteRequest,
  getRequestById,
  getUserRequests,
} from "../../slices/requestSlice";
import IRequest from "../../interfaces/Request";

const Profile = () => {
  const { user: userAuth } = useSelector((state: RootState) => state.auth);

  const dispatch: AppDispatch = useDispatch();

  const reset = useResetComponentMessage(dispatch);

  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenConfirmDeleteProfileModal, setIsOpenConfirmDeleteProfileModal] =
    useState(false);
  const [isOpenRequestModal, setIsOpenRequestModal] = useState(false);
  const [isOpenConfirmDeleteRequestModal, setIsOpenConfirmDeleteRequestModal] =
    useState(false);
  const [newName, setNewName] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [valueTotalBuyReq, setValueTotalBuyReq] = useState<number>(0);

  const { user, message, error, loading } = useSelector(
    (state: RootState) => state.user
  );

  const {
    requests,
    request,
    message: requestMessage,
  } = useSelector((state: RootState) => state.requests);

  const handleUpdateProfile = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const dataUpdate: IUserUpdate = {
      name: newName,
      password: newPassword,
    };

    dispatch(updateProfile(dataUpdate));

    setNewName("");
    setNewPassword("");

    setIsOpenEditModal(false);
  };

  const handleDeleteProfile = () => {
    dispatch(deleteProfile(userAuth?._id));

    window.document.location.reload();
  };

  const handleRequestDetails = (req: IRequest) => {
    dispatch(getRequestById(req._id));
    setIsOpenRequestModal(true);
  };

  const handleDeleteRequest = (id: string | undefined) => {
    dispatch(deleteRequest(id));
    setIsOpenRequestModal(false);
    setIsOpenConfirmDeleteRequestModal(false);
  };

  const openConfirmDeleteRequestModal = () => {
    setIsOpenRequestModal(false);
    setIsOpenConfirmDeleteRequestModal(true);
  };

  const closeConfirmDeleteRequestModal = () => {
    setIsOpenConfirmDeleteRequestModal(false);
    setIsOpenRequestModal(true);
  };

  useEffect(() => {
    dispatch(getUserDetails(userAuth?._id));
  }, [dispatch, userAuth]);

  useEffect(() => {
    dispatch(getUserRequests(userAuth?._id));
  }, [dispatch, userAuth, requests]);

  useEffect(() => {
    reset();
  }, [message, requestMessage]);

  useEffect(() => {
    if (request && request.requestProds.length > 0) {
      const totalValue = request.requestProds.reduce(
        (ac, prod) => ac + prod.price * prod.amount,
        0
      );
      setValueTotalBuyReq(totalValue);
    } else {
      setValueTotalBuyReq(0);
    }
  }, [request]);

  if (loading) {
    return <p className="spinner"></p>;
  }

  return (
    <div className="profile">
      {message && <Message message={message} />}
      {requestMessage && <Message message={requestMessage} />}
      <div className="buttons-img">
        <img src={PersonImg} alt="Perfil do Usuário" />
        <div className="buttons">
          <button className="edition" onClick={() => setIsOpenEditModal(true)}>
            Editar
          </button>
          <button
            className="deleteProfile"
            onClick={() => setIsOpenConfirmDeleteProfileModal(true)}
          >
            Excluir Perfil
          </button>
        </div>
      </div>
      <div className="data">
        <label>Meus dados:</label>
        <p>{user?.name}</p>
        <p>{user?.email}</p>
        <label>Minhas solicitações:</label>
        {requests &&
          requests.map((req) => (
            <div className="request" key={req._id}>
              <div className="title">{req.requestName}</div>

              <div
                className={`situation ${
                  req.requestSituation === "Aguardando" ? "waiting" : "serviced"
                }`}
              >
                {req.requestSituation}
              </div>

              <div className="plus" onClick={() => handleRequestDetails(req)}>
                Ver mais <i className="bi bi-caret-right"></i>
              </div>
            </div>
          ))}
        {requests?.length === 0 && <p>Ainda não há solicitações de compra</p>}
      </div>
      {isOpenEditModal && (
        <Modal>
          <div className="edit-modal">
            <i
              className="bi bi-x"
              onClick={() => setIsOpenEditModal(false)}
            ></i>

            <form onSubmit={handleUpdateProfile}>
              <h1>Formulário de edição</h1>
              <label>Nome:</label>
              <input
                type="text"
                placeholder="Insira aqui seu novo nome..."
                onChange={(e) => setNewName(e.target.value)}
                value={newName || ""}
              />
              <label>Senha:</label>
              <input
                type="password"
                placeholder="Insira aqui sua nova senha..."
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword || ""}
              />
              <div className="buttons-modal-edit">
                <button className="btn-confirm" type="submit">
                  Confirmar
                </button>
                <button
                  className="btn-cancel"
                  onClick={() => setIsOpenEditModal(false)}
                >
                  Cancelar
                </button>
              </div>
            </form>
            {error && <p className="error_message">{error}</p>}
          </div>
        </Modal>
      )}
      {isOpenConfirmDeleteProfileModal && (
        <Modal>
          <div className="delete-profile-modal">
            <i
              className="bi bi-x"
              onClick={() => setIsOpenConfirmDeleteProfileModal(false)}
            ></i>
            <h1>Deseja mesmo excluir seu perfil?</h1>
            <div className="buttons-delete-modal">
              <button className="btn-confirm" onClick={handleDeleteProfile}>
                Confirmar
              </button>
              <button
                className="btn-cancel"
                onClick={() => setIsOpenConfirmDeleteProfileModal(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </Modal>
      )}
      {isOpenRequestModal && (
        <Modal>
          <div className="request-modal">
            <i
              className="bi bi-x"
              onClick={() => setIsOpenRequestModal(false)}
            ></i>
            <h2>Solicitção de compra</h2>
            <div className="request-details">
              <h4>{request?.requestName}</h4>
              <div className="products-of-request">
                <h5>
                  {" "}
                  <i className="bi bi-bag-fill"></i>Produtos da Solicitação:
                </h5>
                {request?.requestProds.map((prod) => (
                  <>
                    <div className="product" key={prod._id}>
                      <span>Produto: {prod.name}</span>
                      <span>Quant.: {prod.amount}</span>
                      <span>
                        Valor:{" "}
                        <span className="price-product">
                          {" "}
                          R${prod.price.toFixed(2)}
                        </span>
                      </span>
                    </div>
                  </>
                ))}

                <div className="total-value-request">
                  Valor total da Compra:
                  <span className="value-total">
                    {" "}
                    R${valueTotalBuyReq.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="method-payment">
                <h5>Metódo de pagemento:</h5>
                <span>
                  <i className="bi bi-wallet"></i>
                  {request?.requestMethodPayment}
                </span>
              </div>
              <div className="address-request">
                <h5>
                  {" "}
                  <i className="bi bi-houses-fill"></i>Endereço de entrega da
                  Solicitão:
                </h5>
                <span>CEP: {request?.requestAddress.cep}</span>
                <span>Rua: {request?.requestAddress.road}</span>
                <span>Número: {request?.requestAddress.homeNumber}</span>
                <span>Bairro: {request?.requestAddress.neighborhood}</span>
                <span>Cidade: {request?.requestAddress.neighborhood}</span>
              </div>
              <div className="situation">
                <h5>
                  {" "}
                  <i className="bi bi-arrow-clockwise"></i>Situação da compra:
                </h5>
                <span className="request-situation waiting">
                  {request?.requestSituation}
                </span>
              </div>
            </div>
            {request?.requestSituation === "Aguardando" && (
              <button
                className="btn-cancel-request"
                onClick={openConfirmDeleteRequestModal}
              >
                Cancelar Solicitação
              </button>
            )}
          </div>
        </Modal>
      )}
      {isOpenConfirmDeleteRequestModal && (
        <Modal>
          <div className="delete-profile-modal">
            <i className="bi bi-x" onClick={closeConfirmDeleteRequestModal}></i>
            <h1>Deseja mesmo cancelar a solicitação?</h1>
            <div className="buttons-delete-modal">
              <button
                className="btn-confirm"
                onClick={() => handleDeleteRequest(request?._id)}
              >
                Confirmar
              </button>
              <button
                className="btn-cancel"
                onClick={closeConfirmDeleteRequestModal}
              >
                Cancelar
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Profile;
