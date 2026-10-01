import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Base RTK Query API. Add endpoints per feature with api.injectEndpoints()
// in src/features/<feature>/<feature>Api.js
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  }),
  tagTypes: [],
  endpoints: () => ({}),
})
