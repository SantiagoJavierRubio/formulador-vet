import type { NextApiRequest, NextApiResponse } from "next";
import constants from "../../utils/constants";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    res.setHeader(
      "Set-Cookie",
      `access_token=deleted;HttpOnly=true;domain=${constants.apiUrl};Path=/;`
    );
    res.setHeader("Access-Control-Allow-Origin", `${constants.apiUrl}`);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    return res.redirect("/login");
  } catch (err) {
    return res.status(500).json(err);
  }
};

export default handler;
