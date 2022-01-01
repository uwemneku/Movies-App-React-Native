import React, { useCallback, useMemo } from "react";
import { useBookmarksContext } from "../Context";
import { StoredMovies } from "../models/movie";

const useBookmark = (id: StoredMovies["imdbID"]) => {
  const { bookmarks, dispatch } = useBookmarksContext();
  const addBookmark = useCallback((movie: StoredMovies) => {
    dispatch({ type: "add", payload: { movie } });
  }, []);
  const removeBookmark = useCallback(() => {
    dispatch({ type: "remove", payload: { id } });
  }, []);
  const isBookmarked = useMemo(() => {
    return bookmarks.some((m) => m.imdbID === id);
  }, [bookmarks]);
  return [addBookmark, removeBookmark, isBookmarked] as const;
};

export default useBookmark;
