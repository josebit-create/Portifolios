import IUserUpdate from "../interfaces/UserUpdate";
import { api, requestConfig } from "../utils/config";

const getUserDetails = async (id: string | undefined) => {
  const config = requestConfig("GET");

  try {
    const res = await fetch(api + "/users/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log("Get User Details Error: ", error);
  }
};

const updateProfile = async (data: IUserUpdate, token: string) => {
  const config = requestConfig("PUT", data, token);

  try {
    const res = await fetch(api + "/users/", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log("Update Profile Error: ", error);
  }
};

const deleteProfile = async (id: string | undefined, token: string) => {
  const config = requestConfig("DELETE", null, token);

  try {
    const res = await fetch(api + "/users/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    localStorage.removeItem("user");

    return res;
  } catch (error) {
    console.log("Delete Profile Error: ", error);
  }
};

const userService = {
  getUserDetails,
  updateProfile,
  deleteProfile,
};

export default userService;
