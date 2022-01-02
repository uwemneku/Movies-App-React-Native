import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { BookmarkProvider } from "./Bookmarks";
import { TabBarVisibilityProvider } from "./BottomTabBarVisibility";
import { ToastProvider } from "./Toast";

const ContextWrapper: FC = ({ children }) => {
  return (
    <ToastProvider>
      <BookmarkProvider>
        <TabBarVisibilityProvider>{children}</TabBarVisibilityProvider>
      </BookmarkProvider>
    </ToastProvider>
  );
};

export default ContextWrapper;

const styles = StyleSheet.create({});
