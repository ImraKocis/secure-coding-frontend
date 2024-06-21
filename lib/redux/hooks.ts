import { useDispatch, useSelector, useStore } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch, AppStore } from "./store";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;

export const useUser = () => useSelector((state: RootState) => state.user.user);
export const useAuth = () => useSelector((state: RootState) => state.auth.auth);
export const useIsNavigationOpen = () =>
  useSelector((state: RootState) => state.navigationBar.isOpen);
export const useSubscription = () =>
  useSelector((state: RootState) => state.subscription.subscription);
