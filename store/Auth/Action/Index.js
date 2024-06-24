import { LOG_IN, LOG_OUT } from "../Types/Index";
import { login } from "../../../configs";
import { toast } from "react-toastify";
import CryptoJs from "crypto-js";
import { REACT_APP_PASS_KEY } from "../auth";
import axios from "axios";
import { SET_CONFIG, DELETE_CONFIG } from "../../TechnologyMaster/Types";

export const userLogin = (user) => (dispatch) => {
  let pass = CryptoJs.AES.encrypt(
    user.password,
    CryptoJs.SHA256(REACT_APP_PASS_KEY),
    {
      keySize: 32,
      iv: CryptoJs.enc.Base64.parse(""), //giving empty initialization vector
      mode: CryptoJs.mode.ECB,
      padding: CryptoJs.pad.Pkcs7,
    }
  ).toString();

  axios
    .post(login(), { email: user.email, password: pass })
    .then((res) => {
      if (res.data && res.data.success === false) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);

        dispatch({
          type: LOG_IN,
          payload: {
            res: res.data,
          },
        });
        dispatch({
          type: SET_CONFIG,
          payload: {
            res: res.data,
          },
        });
      }
    })
    .catch((err) => {
      toast.error("Ops! Something went wrong please try again later");
    });
};

export const UserLogout = () => (dispatch) => {
  dispatch({ type: LOG_OUT });
  dispatch({ type: DELETE_CONFIG });
};
