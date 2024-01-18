import axios from "axios";

const apiInstance = axios.create({ baseURL: "http://localhost:8080" });

apiInstance.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }
  return req;
});

export default apiInstance;
