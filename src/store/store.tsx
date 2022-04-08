import { configureStore } from '@reduxjs/toolkit';
import LoginReducer from '../slices/slices';
import { openApi } from '../api/openAPI';

const store = configureStore({
  reducer: {
    login: LoginReducer,
    [openApi.reducerPath]: openApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(openApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
