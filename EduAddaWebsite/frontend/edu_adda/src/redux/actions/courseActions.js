import { FETCH_COURSES, ADD_COURSE, UPDATE_COURSE, DELETE_COURSE } from './types';
import axios from 'axios';

const url = process.env.REACT_APP_API;

export const fetchCourses = () => async (dispatch) => {
  try {
    const response = await axios.get(`${url}/api/courses`);
    dispatch({
      type: FETCH_COURSES,
      payload: response.data,
    });
  } catch (error) {
    console.error("Fetch courses error:", error);
  }
};

export const addCourse = (course) => async (dispatch) => {
  try {
    const response = await axios.post(`${url}/api/courses`, course);
    dispatch({
      type: ADD_COURSE,
      payload: response.data,
    });
  } catch (error) {
    console.error("Add course error:", error);
  }
};

export const updateCourse = (id, course) => async (dispatch) => {
  try {
    const response = await axios.put(`${url}/api/courses/${id}`, course);
    dispatch({
      type: UPDATE_COURSE,
      payload: response.data,
    });
  } catch (error) {
    console.error("Update course error:", error);
  }
};

export const deleteCourse = (id) => async (dispatch) => {
  try {
    await axios.delete(`${url}/api/courses/${id}`);
    dispatch({
      type: DELETE_COURSE,
      payload: id,
    });
  } catch (error) {
    console.error("Delete course error:", error);
  }
};
