import type { IUser } from "@/types/auth.types";
import { createSlice } from "@reduxjs/toolkit";

type AuthState = {
  user: IUser | null;
};

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout_user: (state) => {
      state.user = null;
    },
  },
});

export const { logout_user } = authSlice.actions;
export default authSlice.reducer;
