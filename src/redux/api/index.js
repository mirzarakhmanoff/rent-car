import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { signOut } from "../slices/authSlices";
const baseQuery = async (args, api, extraOptions) => {
  const { dispatch } = api;
  const rawBaseQuary = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearar ${token}`);
      }
      return headers;
    },
  });
  const response = await rawBaseQuary(args, api, extraOptions);
  if (response.error) {
    const { status } = response.error;
    if (status === 401 || status === 403) {
      console.error("Unauthorized access - Redirecting to login...");
      dispatch(signOut());
    }
  }
  return response;
};
const fetchBaseQueryWithRetry = retry(baseQuery, { maxRetries: 1 });
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQueryWithRetry,
  tagTypes: ["CARS"],
  endpoints: () => ({}),
});
