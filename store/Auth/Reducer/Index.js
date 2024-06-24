import { LOG_IN, LOG_OUT } from "../Types/Index";
const initialState = {
  message: "",
  success: false,
  user: {},
};
export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        message: action.payload.res?.message,
        success: action.payload.res?.success,
        user: action.payload.res.data.user,
      };
    case LOG_OUT:
      return { ...initialState };
    default:
      return state;
  }
};
