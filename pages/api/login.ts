import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import constants from "../../utils/constants";

export default withIronSessionApiRoute(login, constants.ironOptions);

async function login(req: NextApiRequest, res: NextApiResponse) {
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
    if (data.access_token) {
      req.session.user = {
        id: data.user.id,
        email: data.user.email,
        token: data.access_token,
        name: data.user.name,
      };
      await req.session.save();
      return res.redirect("/");
    }
    return res.redirect("/login");
  } catch (err) {
    res.status(500).json(err);
  }
}
