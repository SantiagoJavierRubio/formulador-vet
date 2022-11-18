import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import constants from "../../utils/constants";

export default withIronSessionApiRoute(logout, constants.ironOptions);

async function logout(req: NextApiRequest, res: NextApiResponse) {
  if (req.session.user) req.session.destroy();
  res.redirect("/login");
}
