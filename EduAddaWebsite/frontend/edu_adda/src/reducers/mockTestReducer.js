import { FETCH_MOCKTESTS, ADD_MOCKTEST, UPDATE_MOCKTEST, DELETE_MOCKTEST } from '../redux/actions/types';

const initialState = {
  mockTests: [],
};

const mockTestReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MOCKTESTS:
      return {
        ...state,
        mockTests: action.payload,
      };
    case ADD_MOCKTEST:
      return {
        ...state,
        mockTests: [...state.mockTests, action.payload],
      };
    case UPDATE_MOCKTEST:
      return {
        ...state,
        mockTests: state.mockTests.map(mockTest =>
          mockTest._id === action.payload._id ? action.payload : mockTest
        ),
      };
    case DELETE_MOCKTEST:
      return {
        ...state,
        mockTests: state.mockTests.filter(mockTest => mockTest._id !== action.payload),
      };
    default:
      return state;
  }
};

export default mockTestReducer;
