import React, { FC, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ToastContext from "./Context";

const ToastProvider: FC = ({ children }) => {
  const [message, setMessage] = useState("");
  return (
    <ToastContext.Provider value={{ message, setToastMessage: setMessage }}>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;

const styles = StyleSheet.create({});
