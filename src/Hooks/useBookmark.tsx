import React, { useCallback } from "react";
import { useBookmarksContext } from "../Context";
import { StoredMovies } from "../models/movie";

const useBookmark = () => {
  const { bookmarks, dispatch } = useBookmarksContext();
  const addBookmark = useCallback((movie: StoredMovies) => {
    dispatch({ type: "add", payload: { movie } });
  }, []);
  const removeBookmark = useCallback((movie: StoredMovies) => {
    dispatch({ type: "remove", payload: { id: movie.imdbID } });
  }, []);
  const isBookmarked = useCallback((movie: StoredMovies) => {
    return bookmarks.some((m) => m.imdbID === movie.imdbID);
  }, []);
  return [addBookmark, removeBookmark, isBookmarked] as const;
};

export default useBookmark;
