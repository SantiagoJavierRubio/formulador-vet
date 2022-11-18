const isDev = process.env.NODE_ENV !== "production";

const ironOptions = {
  cookieName: "vetdiet_authentication",
  password: process.env.SECRET || "keyboardcat",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export default {
  apiUrl: isDev ? "http://localhost:8080" : process.env.API_URL,
  ironOptions,
};

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
      email: string;
      token: string;
    };
  }
}
