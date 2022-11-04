import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await fetch("http://localhost:8080/auth", {
      method: "POST",
      body: JSON.stringify({
        email: req.body.email,
        password: req.body.password,
      }),
      headers: { "Content-type": "application/json" },
    });
    const data = await response.json();
    if (data.access_token) {
      res.setHeader(
        "Set-Cookie",
        `access_token=${data.access_token};HttpOnly=true;domain=localhost;Path=/;`
      );
      res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
      res.setHeader("Access-Control-Allow-Credentials", "true");
    }
    return res.redirect("/");
  } catch (err) {
    return res.status(500).json(err);
  }
};

export default handler;
