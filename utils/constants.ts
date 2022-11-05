const isDev = process.env.NODE_ENV !== "production";

export default {
  apiUrl: isDev ? "http://localhost:8080" : process.env.API_URL,
};
