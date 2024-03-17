import { IFactCat } from "../../interfaces/factCats";
import { apiFactCats } from "./apiFactCats";

export const factCatsApi = apiFactCats.injectEndpoints({
  endpoints: (builder) => ({
    getFact: builder.query<IFactCat, void>({
      query: () => ({
        url: "/fact",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetFactQuery } = factCatsApi;
export const { getFact } = factCatsApi.endpoints;
