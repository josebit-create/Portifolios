import { api, requestConfig } from "../utils/config";

const getProducts = async () => {
  const config = requestConfig("GET", null);

  try {
    const res = await fetch(api + "/products", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log("Get products error: ", error);
  }
};

const getProductsBySection = async (section: string | undefined) => {
  const config = requestConfig("GET", null);

  try {
    const res = await fetch(api + "/products/" + section, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log("Get Products By Section Error: ", error);
  }
};

const searchProducts = async (q: string | undefined) => {
  const config = requestConfig("GET", null);

  try {
    const res = await fetch(api + "/products/search?q=" + q, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log("Search Products Error", error);
  }
};

const productsService = {
  getProducts,
  getProductsBySection,
  searchProducts,
};

export default productsService;
