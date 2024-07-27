import { FETCH_MOCKTESTS, ADD_MOCKTEST, UPDATE_MOCKTEST, DELETE_MOCKTEST } from './types';
import axios from 'axios';

const url = process.env.REACT_APP_API;

export const fetchMockTests = () => async (dispatch) => {
  try {
    const response = await axios.get(`${url}/api/mocktests`);
    dispatch({
      type: FETCH_MOCKTESTS,
      payload: response.data,
    });
  } catch (error) {
    console.error("Fetch mock tests error:", error);
  }
};

export const addMockTest = (mockTest) => async (dispatch) => {
  try {
    const response = await axios.post(`${url}/api/mocktests`, mockTest);
    dispatch({
      type: ADD_MOCKTEST,
      payload: response.data,
    });
  } catch (error) {
    console.error("Add mock test error:", error);
  }
};

export const updateMockTest = (id, mockTest) => async (dispatch) => {
  try {
    const response = await axios.put(`${url}/api/mocktests/${id}`, mockTest);
    dispatch({
      type: UPDATE_MOCKTEST,
      payload: response.data,
    });
  } catch (error) {
    console.error("Update mock test error:", error);
  }
};

export const deleteMockTest = (id) => async (dispatch) => {
  try {
    await axios.delete(`${url}/api/mocktests/${id}`);
    dispatch({
      type: DELETE_MOCKTEST,
      payload: id,
    });
  } catch (error) {
    console.error("Delete mock test error:", error);
  }
};
