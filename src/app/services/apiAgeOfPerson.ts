import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const queryAgeOfPersonUrl = fetchBaseQuery({
  baseUrl: "https://api.agify.io",
});

export const apiAgeOfPerson = createApi({
  reducerPath: "splitApiAgeOfPerson",
  baseQuery: queryAgeOfPersonUrl,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
});
