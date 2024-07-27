import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { composeWithDevTools } from '@redux-devtools/extension';
import { thunk } from 'redux-thunk';
import authReducer from '../reducers/authReducer';
import courseReducer from '../reducers/courseReducer';
import mockTestReducer from '../reducers/mockTestReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  courses: courseReducer,
  mockTests: mockTestReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: process.env.NODE_ENV !== 'production' ? composeWithDevTools() : false,
});

export default store;
