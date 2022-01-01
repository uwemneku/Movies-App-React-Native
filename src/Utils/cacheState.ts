import AsyncStorage from "@react-native-async-storage/async-storage";
import { CACHE_KEY } from "../Constants";
import { StoredMovies } from "../models/movie";


export const setCacheData = async (movies: StoredMovies[]) => {
    try {
        const value = JSON.stringify(movies);
        await AsyncStorage.setItem(CACHE_KEY, value);
    } catch (error) {
        
    }
}

export const getCacheData = async ()=> {
    try {
        const value = await AsyncStorage.getItem(CACHE_KEY);
        if (value !== null) {
            return JSON.parse(value) as StoredMovies[];
        }
        else{
            return [] as StoredMovies[]
        }
    } catch (error) {
        
    }
}