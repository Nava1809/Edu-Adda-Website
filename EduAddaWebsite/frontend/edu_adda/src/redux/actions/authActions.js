import { LOGIN_SUCCESS, LOGOUT, REGISTER_SUCCESS } from './types';
import axios from 'axios';

const url = process.env.REACT_APP_API;

export const registerUser = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post(`${url}/register`, { email, password });
    dispatch({
      type: REGISTER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.error("Registration error:", error);
  }
};

export const loginUser = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post(`${url}/`, { email, password });
    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.error("Login error:", error);
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  dispatch({
    type: LOGOUT,
  });
};
