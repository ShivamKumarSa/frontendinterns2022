import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LoginState {
  name: string | null;
  email: string | null;
  emailVerified: boolean | null;
  uid: string | null;
  userType: string | null;
}

const initialState: LoginState = {
  name: null,
  email: null,
  emailVerified: false,
  uid: null,
  userType: null,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setUserType: (state, action: PayloadAction<{ userType: string }>) => {
      state.userType = action.payload.userType;
    },
    setName: (state, action: PayloadAction<string | null>) => {
      state.name = action.payload;
    },

    removeName: (state) => {
      state.name = null;
    },

    setEmail: (state, action: PayloadAction<string | null>) => {
      state.email = action.payload;
    },

    removeEmail: (state) => {
      state.email = null;
    },

    setEmailVerified: (state, action: PayloadAction<boolean | null>) => {
      state.emailVerified = action.payload;
    },

    removeEmailVerified: (state) => {
      state.emailVerified = null;
    },

    setUid: (state, action: PayloadAction<string | null>) => {
      state.uid = action.payload;
    },

    removeUid: (state) => {
      state.uid = null;
    },
    removeUserType: (state) => {
      state.userType = null;
    },
  },
});

const LoginReducer = loginSlice.reducer;

export const {
  setUserType,
  setName,
  setEmail,
  removeName,
  removeEmail,
  setEmailVerified,
  removeEmailVerified,
  setUid,
  removeUid,
  removeUserType,
} = loginSlice.actions;

export default LoginReducer;
