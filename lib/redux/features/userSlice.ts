import { User } from "@/lib/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "@/lib/redux/store";
import { deleteAuthSession } from "@/app/actions/auth/actions";

export interface UserSlice {
  user: User | null;
  deletingSession: boolean;
}

const initialState: UserSlice = {
  user: null,
  deletingSession: false,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    deleteStart: (state) => {
      state.deletingSession = true;
    },
    deleteSuccess: (state) => {
      state.user = null;
      state.deletingSession = false;
    },
    deleteFailure: (state) => {
      state.deletingSession = false;
    },
  },
});

export const { set, deleteStart, deleteSuccess, deleteFailure } =
  userSlice.actions;

export const deleteUser = (): AppThunk => async (dispatch) => {
  dispatch(deleteStart());
  try {
    await deleteAuthSession();
    dispatch(deleteSuccess());
  } catch (error) {
    console.error("Error deleting session:", error);
    dispatch(deleteFailure());
  }
};

export default userSlice.reducer;
