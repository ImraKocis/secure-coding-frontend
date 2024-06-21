import { Subscription } from "@/lib/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SubscriptionSlice {
  subscription: Subscription | null;
}

const initialState: SubscriptionSlice = {
  subscription: null,
};

export const subscriptionSlice = createSlice({
  name: "subscriptionSlice",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Subscription | null>) => {
      state.subscription = action.payload;
    },
    deleteSubscription: (state) => {
      state.subscription = null;
    },
  },
});

export const { set, deleteSubscription } = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
