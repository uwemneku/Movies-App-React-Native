import { NavigatorScreenParams } from "@react-navigation/native"

export type RootParamList = {
    main: NavigatorScreenParams<BottomTabParamList>
    search: undefined
}

export type SharedScreenParamList = {
    bookDetails: {image: string; id: number, Director: string, title: string, description: string, rating: string}
    Home: undefined;
}
export type BottomTabParamList = {
    BottomTabHome: NavigatorScreenParams<SharedScreenParamList>
    Settings: undefined;
    Cart: undefined;
    Bookmarks: undefined;
}