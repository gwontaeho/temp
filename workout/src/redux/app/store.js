import {configureStore} from '@reduxjs/toolkit';
import tokenReducer from '#redux/features/token/tokenSlice';

export const store = configureStore({
  reducer: {
    token: tokenReducer,
  },
});
