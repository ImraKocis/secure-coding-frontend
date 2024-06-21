import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface NavigationBarSlice {
  isOpen: boolean;
}

const initialState: NavigationBarSlice = {
  isOpen: true,
};

export const navigationBarSlice = createSlice({
  name: "navigationBarSlice",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

export const { set } = navigationBarSlice.actions;

export default navigationBarSlice.reducer;
