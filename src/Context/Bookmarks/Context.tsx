import React, { useContext } from "react";
import { StoredMovies } from "../../models/movie";

export type BookmarkDispatchAction =
  | { type: "add"; payload: { movie: StoredMovies } }
  | { type: "remove"; payload: { id: string } };

type bookmarkSchema = {
  bookmarks: StoredMovies[];
  dispatch: React.Dispatch<BookmarkDispatchAction>;
};

const BookmarksContext = React.createContext({} as bookmarkSchema);
export const useBookmarksContext = () => React.useContext(BookmarksContext);

export default BookmarksContext;
