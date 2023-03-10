import axiosClient from "./axiosClient";

const authApi = {
  register: params => axiosClient.post("auth/registration/", params),
  // login: (params) => axiosClient.post("auth/login", params),
  verifyToken: () => axiosClient.post("auth/verify-token")
};

export default authApi;
