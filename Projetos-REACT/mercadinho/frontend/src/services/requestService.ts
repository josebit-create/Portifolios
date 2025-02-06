import { api, requestConfig } from "../utils/config";
import IRequest from "../interfaces/Request";

const insertRequest = async (data: IRequest, token: string | undefined) => {
  const config = requestConfig("POST", data, token);

  try {
    const res = await fetch(api + "/requests/", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log("Insert Request error: ", error);
  }
};

const getUserRequests = async (id: string | undefined, token: string) => {
  const config = requestConfig("GET", null, token);

  try {
    const res = await fetch(api + "/requests/user/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log("Get User Requests Error: ", error);
  }
};

const getRequestById = async (id: string | undefined, token: string) => {
  const config = requestConfig("GET", null, token);

  try {
    const res = await fetch(api + "/requests/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log("Get Request By Id Error: ", error);
  }
};

const deleteRequest = async (id: string | undefined, token: string) => {
  const config = requestConfig("DELETE", null, token);

  try {
    const res = await fetch(api + "/requests/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log("Delete Request Error: ", error);
  }
};

const requestService = {
  insertRequest,
  getUserRequests,
  getRequestById,
  deleteRequest,
};

export default requestService;
