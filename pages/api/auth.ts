import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import constants from "../../utils/constants";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await fetch(`${constants.apiUrl}/auth`, {
      method: "POST",
      body: JSON.stringify({
        email: req.body.email,
        password: req.body.password,
      }),
      headers: { "Content-type": "application/json" },
    });
    const data = await response.json();
    const domain = new URL(`${constants.apiUrl}`).hostname;
    if (data.access_token) {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("access_token", data.access_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 60,
          path: "/",
        })
      );
      res.setHeader("Access-Control-Allow-Origin", `${constants.apiUrl}`);
      res.setHeader("Access-Control-Allow-Credentials", "true");
    }
    return res.redirect("/");
  } catch (err) {
    return res.status(500).json(err);
  }
};

// `access_token=${data.access_token};HttpOnly=true;domain=${domain};Path=/;`
export default handler;
