import { NavigatorScreenParams } from "@react-navigation/native"
import { StoredMovies } from "../models/movie"

export type SharedScreenParamList = {
    Search: undefined
    BookDetails: StoredMovies
    Home: undefined;
    Settings: undefined;
    Bookmarks: undefined;
}