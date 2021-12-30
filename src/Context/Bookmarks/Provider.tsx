import React, { FC, Reducer, ReducerAction, useReducer, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Movie, StoredMovies } from "../../models/movie";
import BookmarksContext, { BookmarkDispatchAction } from "./Context";

const reducer: Reducer<StoredMovies[], BookmarkDispatchAction> = (
  state,
  action
) => {
  switch (action.type) {
    case "add":
      return [...state, action.payload.movie];
    case "remove":
      return state.filter((m) => m.imdbID !== action.payload.id);
    default:
      return state;
  }
};

const Provider: FC = ({ children }) => {
  const [bookmarks, dispatch] = useReducer(reducer, []);
  return (
    <BookmarksContext.Provider value={{ bookmarks, dispatch }}>
      {children}
    </BookmarksContext.Provider>
  );
};

export default Provider;

const styles = StyleSheet.create({});
