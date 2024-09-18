import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { signOut } from "../slices/authSlice";

const baseQuery = async (args, api, extraOptions) => {
  const { dispatch } = api;

  // Настраиваем fetchBaseQuery с базовым URL и токенами
  const rawBaseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`); // Исправлено 'Authorization' и 'Bearer'
      }
      return headers;
    },
  });

  // Выполняем запрос
  const response = await rawBaseQuery(args, api, extraOptions);

  // Проверяем на ошибки авторизации
  if (response.error) {
    const { status } = response.error;
    if (status === 401 || status === 403) {
      console.error("Unauthorized access - Redirecting to login...");
      dispatch(signOut());
    }
  }

  return response;
};

// Оборачиваем в retry с максимальным числом повторов
const fetchBaseQueryWithRetry = retry(baseQuery, { maxRetries: 1 });

// Создаем API с помощью createApi
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQueryWithRetry,
  tagTypes: ["CARS"], // Добавьте нужные теги для кэширования
  endpoints: () => ({}), // Здесь вы можете добавить свои endpoints
});
