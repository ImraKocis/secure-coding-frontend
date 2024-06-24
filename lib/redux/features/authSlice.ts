import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthResponse, Session } from "@/lib/types/auth";

export interface AuthSlice {
  auth: Session | null;
}

const initialState: AuthSlice = {
  auth: null,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Session | null>) => {
      state.auth = action.payload;
    },
    clear: (state) => {
      state.auth = null;
    },
  },
});

export const { set, clear } = authSlice.actions;

export default authSlice.reducer;
