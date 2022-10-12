import axios from "axios";
import { config } from "../config";
import { mpesa_urls } from "../config/mpesaurls";

export const authToken = async (req: any, res: any, next: any) => {
  const auth = `${config.consumer_key}:${config.consumer_secret}`;
  const authorization = Buffer.from(auth).toString("base64");
  try {
    axios({
      method: "get",
      url: mpesa_urls.get_credentials,
      headers: {
        Authorization: `Basic ${authorization}`,
      },
    })
      .then((response) => {
        const access_token = response.data.access_token;
        req.token = access_token;
        next();
      })
      .catch((error) => {
        res.status(401).send(error.message);
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};
