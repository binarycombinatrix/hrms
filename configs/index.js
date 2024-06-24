import {baseURL} from "./website";

export const login = () => {return (baseURL + "signin")}
export const register = () => {return (baseURL + "user")}
export const updateUser = (id) => {return (baseURL + "user/" + id)}