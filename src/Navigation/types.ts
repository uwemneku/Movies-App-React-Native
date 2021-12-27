import { NavigatorScreenParams } from "@react-navigation/native"

export type RootParamList = {
    main: NavigatorScreenParams<BottomTabParamList>
    bookDetails: {image: string; id: string} 
    search: undefined
}

export type BottomTabParamList = {
    Home: undefined;
    Settings: undefined;
    Cart: undefined;
    Bookmarks: undefined;
}