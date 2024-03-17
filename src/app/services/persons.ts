import { IPerson } from "../../interfaces/person";
import { apiAgeOfPerson } from "./apiAgeOfPerson";

export const personsApi = apiAgeOfPerson.injectEndpoints({
  endpoints: (builder) => ({
    getPersonByName: builder.query<IPerson, string>({
      query: (name) => ({
        url: `/?name=${name}`,
        method: "GET",
      }),
      providesTags: ["Person"],
    }),
  }),
});

export const { useGetPersonByNameQuery } = personsApi;
export const { getPersonByName } = personsApi.endpoints;
