import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface AlertDialogContextProps {
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
}

const AlertDialogContext = createContext<AlertDialogContextProps | undefined>(
  undefined,
);

export const AlertDialogProvider = ({ children }: { children: ReactNode }) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  return (
    <AlertDialogContext.Provider
      value={{
        isDialogOpen,
        setIsDialogOpen,
      }}
    >
      {children}
    </AlertDialogContext.Provider>
  );
};

export const useAlertDialogContext = () => {
  const context = useContext(AlertDialogContext);
  if (!context) {
    throw new Error(
      "useAlertDialogContext must be used within a AlertDialogProvider",
    );
  }
  return context;
};
