/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import useLocalStorage from "../shared/hooks/useLocalStorage";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACK_URL,
  withCredentials: true,
});
const storage = useLocalStorage();

instance.interceptors.request.use(
  (config) => {
    const token = storage.get("token");
    if (!!token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (err) => {
    console.log("interceptor", err);
    return Promise.reject(err);
  }
);

export default instance;
