import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import authReducer from "./features/authSlice";
import navigationBarReducer from "./features/navigationBarSlice";
import subscriptionReducer from "./features/subscriptionSlice";

// State

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      auth: authReducer,
      navigationBar: navigationBarReducer,
      subscription: subscriptionReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
