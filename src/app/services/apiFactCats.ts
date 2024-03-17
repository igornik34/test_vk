import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const queryFactCatsUrl = fetchBaseQuery({
  baseUrl: "https://catfact.ninja",
});

export const apiFactCats = createApi({
  reducerPath: "splitApiFactCats",
  baseQuery: queryFactCatsUrl,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
});
