import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { apiBaseUrl } from "../config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const path = req.query.path;
    const endpointPath = Array.isArray(path) ? path.join("/") : path;
    const url = `${apiBaseUrl}/${endpointPath}`;

    const response = await axios({
      method: req.method,
      url,
      data: req.body,
      headers: {
        ...req.headers,
        host: new URL(apiBaseUrl!).host,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      res
        .status(error.response.status)
        .json({ message: error.response.statusText });
    } else {
      res.status(500).json({ message: "Error in fetching data" });
    }
  }
}
