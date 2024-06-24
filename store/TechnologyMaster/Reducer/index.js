import { SET_CONFIG, DELETE_CONFIG } from "../Types";

const initialState = {
  message: "",
  success: false,
  config: {},
};

export const ConfigReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CONFIG:
      return {
        message: action.payload.res?.message,
        success: action.payload.res?.success,
        config: action.payload.res.data.config,
      };
    case DELETE_CONFIG:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
