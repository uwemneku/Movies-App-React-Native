import { Movie } from './../models/movie';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const api = createApi({
    baseQuery: fetchBaseQuery({baseUrl: 'http://www.omdbapi.com'}),
    endpoints: (builder) => ({
        getMovies: builder.query<Movie, string>({
            query:(t: string) => `/?apikey=1e9aace7&t=${t}`,
        })
    })
})

export default api;