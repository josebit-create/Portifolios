import IProdCart from "../interfaces/ProdCart";
import IProdCartPut from "../interfaces/ProdCartPut";
import { api, requestConfig } from "../utils/config";

const insertProdCart = async (data: IProdCart, token: string) => {
  const config = requestConfig("POST", data, token);

  try {
    const res = fetch(api + "/cart/", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log("Insert Product in Cart error: ", error);
  }
};

const getProductsCart = async (id: string | undefined, token: string) => {
  const config = requestConfig("GET", null, token);

  try {
    const res = await fetch(api + "/cart/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log("Get Products Cart Error: ", error);
  }
};

const updateProdCart = async (
  id: string | undefined,
  data: IProdCartPut,
  token: string
) => {
  const config = requestConfig("PUT", data, token);

  try {
    const res = await fetch(api + "/cart/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log("Update Product Cart Error: ", error);
  }
};

const deleteProdCart = async (id: string | undefined, token: string) => {
  const config = requestConfig("DELETE", null, token);

  try {
    const res = await fetch(api + "/cart/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log("Delete Product Cart Error: ", error);
  }
};

const cartService = {
  insertProdCart,
  getProductsCart,
  updateProdCart,
  deleteProdCart,
};

export default cartService;
