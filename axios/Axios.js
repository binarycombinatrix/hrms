import axios from "axios";
import { toast } from "react-toastify";
import { store } from "../store/Index";
import { UserLogout } from "../store/Auth/Action/Index";

const instance = axios.create({
  baseURL: `http://192.168.0.31:3006/`,
});
let token;
store.subscribe(() => {
  // When state will be updated(in our case, when items will be fetched),
  // we will update local component state and force component to rerender
  // with new data.
  token = store.getState().Auth.user.accessToken;
});
instance.interceptors.request.use(
  (req) => {
    req.headers = {
      Authorization: `Bearer ${token}`,
    };
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  (res) => {
    const {
      status,
      data,
      data: { message },
      config: { method },
    } = res;
    if (status === 201 && method === "post") {
      toast.success(message);
      return data;
    }

    if (status === 200 && method === "post") {
      toast.success(message);
      return data;
    }
    if (status === 200 && method === "put") {
      return data;
    }
    if (status === 200 && method === "delete") {
      toast.success(message);
      return data;
    }
    if (status === 200 && method === "get") {
      return data;
    }
  },
  (err) => {
    if (err.response) {
      const {
        status,
        data: { message },
        config: { method },
      } = err.response;
      if (status === 500 && method === "post") {
        toast.error("something went wrong");
        return { status: false, data: [] };
      }
      if (status === 404 && method === "get") {
        return { status: false, data: [] };
      }
      if (status === 401 && method === "get") {
        toast.error("Your session is expired please login again to continue.");
        store.dispatch(UserLogout());
        return { status: false, data: [] };
      }
      if (status === 400 && method === "post") {
        toast.error(message);
        return { status: false, data: [] };
      }
      if (status === 400 && method === "put") {
        toast.error(message);
        return { status: false, data: [] };
      }
      if (status === 409 && method === "post") {
        toast.error(message);
        return { status: false, data: [] };
      }
      if (status === 409 && method === "get") {
        toast.error(message);
        return { status: false, data: [] };
      }
      return err;
    }
    return { status: false, data: [] };
  }
);

export default instance;
