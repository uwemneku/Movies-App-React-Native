import React from "react";

const ToastContext = React.createContext<{
  message: string;
  setToastMessage: React.Dispatch<React.SetStateAction<string>>;
}>({ message: "", setToastMessage: () => {} });

export const useToastContext = () => React.useContext(ToastContext);

export default ToastContext;
