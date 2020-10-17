import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3333",
  //headers: { authorization: window.localStorage.getItem("token") },
});
api.interceptors.response.use(
  function (res) {
    return res;
  },
  function (err) {
    if (err?.response?.status === 401) {
      console.log(err?.response?.status);

      window.localStorage.clear();
      window.location.replace("/login");
      return;
    }
    return err.response;
  }
);
export default api;
