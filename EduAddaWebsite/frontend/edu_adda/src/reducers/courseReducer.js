import { FETCH_COURSES, ADD_COURSE, UPDATE_COURSE, DELETE_COURSE } from '../redux/actions/types';

const initialState = {
  courses: [],
};

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COURSES:
      return {
        ...state,
        courses: action.payload,
      };
    case ADD_COURSE:
      return {
        ...state,
        courses: [...state.courses, action.payload],
      };
    case UPDATE_COURSE:
      return {
        ...state,
        courses: state.courses.map(course =>
          course._id === action.payload._id ? action.payload : course
        ),
      };
    case DELETE_COURSE:
      return {
        ...state,
        courses: state.courses.filter(course => course._id !== action.payload),
      };
    default:
      return state;
  }
};

export default courseReducer;
