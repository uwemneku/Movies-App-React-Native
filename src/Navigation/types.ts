import { NavigatorScreenParams } from "@react-navigation/native"
import { StoredMovies } from "../models/movie"

export type RootParamList = {
    main: NavigatorScreenParams<BottomTabParamList>
    search: undefined
}

export type SharedScreenParamList = {
    bookDetails: StoredMovies
    Home: undefined;
}
export type BottomTabParamList = {
    BottomTabHome: NavigatorScreenParams<SharedScreenParamList>
    Settings: undefined;
    Cart: undefined;
    Bookmarks: undefined;
}