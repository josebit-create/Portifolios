import "./Cart.css";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProdCart,
  getProductsCart,
  updateProdCart,
} from "../../slices/cartSlice";
import { AppDispatch, RootState } from "../../store";
import IProdCart from "../../interfaces/ProdCart";
import Message from "../../components/Message";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";
import Modal from "../../components/Modal";
import { useReqAddressByCep } from "../../hooks/useReqAddressByCep";
import { insertRequest } from "../../slices/requestSlice";

const Cart = () => {
  const dispatch: AppDispatch = useDispatch();

  const [prodCart, setProdCart] = useState<IProdCart>();

  const [reqName, setReqName] = useState<string | undefined>(undefined);
  const [reqMethodPayment, setReqMethodPayment] = useState<string | undefined>(
    undefined
  );
  const [reqAddressCep, setReqAddressCep] = useState<string | undefined>(
    undefined
  );
  const [reqAddressRoad, setReqAddressRoad] = useState<string | undefined>(
    undefined
  );
  const [reqAddressHomeNumber, setReqAddressHomeNumber] = useState<
    string | undefined
  >(undefined);
  const [reqAddressNeighborhood, setReqAddressNeighborhood] = useState<
    string | undefined
  >(undefined);
  const [reqAddressCity, setReqAddressCity] = useState<string | undefined>(
    undefined
  );
  const [errorCep, setErrorCep] = useState(false);

  const [
    isOpenModalConfirmDeleteProductInCart,
    setIsOpenModalConfirmDeleteProductInCart,
  ] = useState(false);

  const [isOpenBuyModal, setIsOpenBuyModal] = useState(false);

  const reset = useResetComponentMessage(dispatch);

  const [cartValue, setCartValue] = useState<number>();
  const { cartProds } = useSelector((state: RootState) => state.cart);
  const { message } = useSelector((state: RootState) => state.cart);
  const { user } = useSelector((state: RootState) => state.auth);
  const { error, message: messageRequest } = useSelector(
    (state: RootState) => state.requests
  );

  const openConfirmDeleteProductInCartModal = (prod: IProdCart) => {
    setIsOpenModalConfirmDeleteProductInCart(true);
    setProdCart(prod);
  };

  const handleDelete = useCallback(
    (prod: IProdCart | undefined) => {
      dispatch(deleteProdCart(prod?._id));
      setIsOpenModalConfirmDeleteProductInCart(false);
    },
    [dispatch]
  );

  const handleUpdate = useCallback(
    (prod: IProdCart, value: number) => {
      const data = {
        id: prod._id,
        amount: value,
      };

      if (value < 1) {
        setProdCart(prod);
        setIsOpenModalConfirmDeleteProductInCart(true);
        return;
      }

      dispatch(updateProdCart(data));
    },
    [dispatch]
  );

  const handleAddressByCep = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setErrorCep(false);
    const { address, error } = await useReqAddressByCep(reqAddressCep);

    if (address) {
      setReqAddressRoad(address.logradouro);
      setReqAddressNeighborhood(address.bairro);
      setReqAddressCity(address.localidade);
    }

    if (error) {
      setErrorCep(true);
    }

    console.log(address);
  };

  const handleCreateRequest = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const resquest = {
      requestName: reqName,
      requestProds: [...cartProds],
      requestMethodPayment: reqMethodPayment,
      requestAddress: {
        cep: reqAddressCep,
        road: reqAddressRoad,
        homeNumber: reqAddressHomeNumber,
        neighborhood: reqAddressNeighborhood,
        city: reqAddressCity,
      },
      requestSituation: "Aguardando",
      userId: user?._id,
    };
    dispatch(insertRequest(resquest));

    if (!error) {
      cartProds?.map((prod) => {
        handleDelete(prod);
      });
      setIsOpenBuyModal(false);
      setReqAddressCep(undefined);
      setReqAddressCity(undefined);
      setReqAddressHomeNumber(undefined);
      setReqAddressNeighborhood(undefined);
      setReqAddressRoad(undefined);
      setReqMethodPayment(undefined);
      setReqName(undefined);
    }
  };

  useEffect(() => {
    if (user) {
      dispatch(getProductsCart(user?._id));
    }
  }, [dispatch]);

  useEffect(() => {
    if (cartProds && cartProds.length > 0) {
      const totalValue = cartProds.reduce(
        (ac, prod) => ac + prod.price * prod.amount,
        0
      );
      setCartValue(totalValue);
    } else {
      setCartValue(0);
    }
  }, [cartProds]);

  useEffect(() => {
    reset();
  }, [message, messageRequest]);

  return (
    <div className="cart">
      {message && <Message message={message} />}
      {messageRequest && <Message message={messageRequest} />}
      <h1>Carrinho de Compras</h1>
      <div className="products">
        {cartProds.length === 0 ? (
          <p className="message_2">Não há produtos no carrinho.</p>
        ) : (
          cartProds.map((prod) => (
            <div key={prod.name} className="cartProd">
              <p className="name">{prod.name}</p>
              <p className="price">R${prod.price.toFixed(2)}</p>
              <div id="actions">
                <span
                  className="action"
                  onClick={() =>
                    handleUpdate(
                      prod,
                      prod.amount ? prod.amount - 1 : prod.amount
                    )
                  }
                >
                  -
                </span>
                <span>{prod.amount}</span>
                <span
                  className="action"
                  onClick={() =>
                    handleUpdate(
                      prod,
                      prod.amount ? prod.amount + 1 : prod.amount
                    )
                  }
                >
                  +
                </span>
              </div>
              <button
                className="delete-button"
                onClick={() => openConfirmDeleteProductInCartModal(prod)}
              >
                Exluir
              </button>
            </div>
          ))
        )}
      </div>
      <div className="cartValue">
        <p>
          Valor total das compras: <span>R${cartValue?.toFixed(2)}</span>
        </p>
        {cartProds.length === 0 ? (
          <button className="btn-disabled">Finalizar compra</button>
        ) : (
          <button onClick={() => setIsOpenBuyModal(true)}>
            Finalizar compra
          </button>
        )}
      </div>
      {isOpenModalConfirmDeleteProductInCart && (
        <Modal>
          <div className="modal-cofirm-delete-product-in-cart">
            <i
              className="bi bi-x"
              onClick={() => setIsOpenModalConfirmDeleteProductInCart(false)}
            ></i>
            <h2>Deseja mesmo excluir este produto do carrinho?</h2>
            <div className="buttons-delete-modal">
              <button
                className="btn-confirm"
                onClick={() => handleDelete(prodCart)}
              >
                Confirmar
              </button>
              <button
                className="btn-cancel"
                onClick={() => setIsOpenModalConfirmDeleteProductInCart(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </Modal>
      )}
      {isOpenBuyModal && (
        <Modal>
          <form className="buy-modal" onSubmit={handleCreateRequest}>
            <i className="bi bi-x" onClick={() => setIsOpenBuyModal(false)}></i>
            <h3>Lista de Compras</h3>

            <div className="nameRequest">
              <h4>Dê um nome a sua solicitação de compra:</h4>
              <input
                type="text"
                placeholder="Informe o nome da solicitação..."
                onChange={(e) => setReqName(e.target.value)}
                value={reqName || ""}
              />
            </div>
            <div className="shopping">
              <h4>Produtos do Carrinho:</h4>
              {cartProds &&
                cartProds.map((prod) => (
                  <div className="product-shopping" key={prod._id}>
                    <span>Produto: {prod.name}</span>
                    <span>Quant.: {prod.amount}</span>
                    <span>
                      Valor:{" "}
                      <span className="price-product-shopping">
                        R${prod.price.toFixed(2)}
                      </span>
                    </span>
                  </div>
                ))}
              <div className="value-shopping">
                Valor Total das Compras:{" "}
                <span className="price-shopping">
                  R${cartValue?.toFixed(2)}
                </span>
              </div>
            </div>
            <div className="payment">
              <h4>Forma de Pagamento:</h4>
              <select
                onChange={(e) => setReqMethodPayment(e.target.value)}
                value={reqMethodPayment || undefined}
              >
                <option value="">Selecione uma opção de pagemento</option>
                <option value="Cartão de crédito">Cartão de crédito</option>
                <option value="Dinheiro">Dinheiro</option>
                <option value="Pix">Pix</option>
              </select>
            </div>
            <div className="address">
              <h4>Endereço de entrega:</h4>
              <div className="cep">
                <input
                  type="text"
                  placeholder="CEP"
                  onChange={(e) => setReqAddressCep(e.target.value)}
                  value={reqAddressCep || undefined}
                />
                <button onClick={handleAddressByCep}>Buscar</button>
                {errorCep && <p>CEP não encontrado.</p>}
              </div>
              <div className="road">
                <input
                  type="text"
                  placeholder="Rua"
                  disabled={reqAddressRoad ? true : false}
                  onChange={(e) => setReqAddressRoad(e.target.value)}
                  value={reqAddressRoad || undefined}
                />
              </div>
              <div className="number-home">
                <input
                  type="text"
                  placeholder="Número da casa"
                  onChange={(e) => setReqAddressHomeNumber(e.target.value)}
                  value={reqAddressHomeNumber || undefined}
                />
              </div>
              <div className="neighborhood">
                <input
                  type="text"
                  placeholder="Bairro"
                  disabled={reqAddressNeighborhood ? true : false}
                  onChange={(e) => setReqAddressNeighborhood(e.target.value)}
                  value={reqAddressNeighborhood || undefined}
                />
              </div>
              <div className="city">
                <input
                  type="text"
                  placeholder="Cidade"
                  disabled={reqAddressCity ? true : false}
                  onChange={(e) => setReqAddressCity(e.target.value)}
                  value={reqAddressCity || undefined}
                />
              </div>
            </div>
            <button type="submit">Confirmar Compra</button>
            {error && <p className="error_message">{error}</p>}
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Cart;
