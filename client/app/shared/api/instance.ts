import axios from "axios";
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACK_URL,
  withCredentials: true,
});

// instance.interceptors.request(
//   () => {},
//   () => {}
// );
export default instance;
