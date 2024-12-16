import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  userId: string | number | null;
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
}

const getTokenFromLocal = (key: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return localStorage.getItem(key);
};

const initialState: AuthState = {
  userId: getTokenFromLocal("userId") || null,
  accessToken: getTokenFromLocal("access_token") || null,
  refreshToken: getTokenFromLocal("refresh_token") || null,
  isAuthenticated: !!getTokenFromLocal("access_token"),
};

const authSlide = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken: string;
      }>
    ) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      localStorage.setItem("access_token", action.payload.accessToken);
      localStorage.setItem("refresh_token", action.payload.refreshToken);
    },
    login(
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken: string;
        userId: string | number;
      }>
    ) {
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.userId = action.payload.userId;
      localStorage.setItem("access_token", action.payload.accessToken);
      localStorage.setItem("refresh_token", action.payload.refreshToken);
      localStorage.setItem("userId", action.payload.userId as string);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.userId = null;
      state.refreshToken = null;
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("userId");
    },
  },
});

export const { login, logout, setToken } = authSlide.actions;

export default authSlide.reducer;
