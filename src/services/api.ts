import { Movie } from './../models/movie';
import {createApi, fetchBaseQuery, FetchBaseQueryError} from '@reduxjs/toolkit/query/react'

const api = createApi({
    baseQuery: fetchBaseQuery({baseUrl: 'http://www.omdbapi.com'}),
    endpoints: (builder) => ({
        getMovies: builder.query<Movie[], string[]>({
            async queryFn(_args, _queryApi, _extraOptions, fetchWithBQ){
                const results = await Promise.all(_args.map(titile => fetchWithBQ(`/?apikey=1e9aace7&t=${titile}`)));
                const error = results.map(r => r.error) as FetchBaseQueryError[] ;
                // const error = "results.map(r => r.error)";
                const data = results.map(r => r.data) as Movie[];
                if (data.length > 0) {
                    return {data}
                }
                return {data};
            }
        })
    })
})

export default api;