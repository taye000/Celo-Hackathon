import moment from "moment";
import axios from "axios";
import { mpesa_urls } from "../config/mpesaurls";
import { config } from "../config";

export const stk_push = async (req: any, res: any) => {
  const token = req.token;
  console.log(`Token: ${token}`);

  const short_code = config.short_code;
  const passkey = config.passkey;

  const date_now = Date.now();
  const timestamp = moment(date_now).format("YYYYMMDDHHmmss");
  console.log(`Timestamp: ${timestamp}`);

  const password = Buffer.from(`${short_code}${passkey}${timestamp}`).toString(
    "base64"
  );
  console.log(`Password: ${password}`);

  const { amount } = req.body;

  console.log(amount);

  const data = {
    BusinessShortCode: short_code,
    Password: password,
    Timestamp: `${timestamp}`,
    TransactionType: "CustomerPayBillOnline",
    Amount: amount,
    PartyA: config.phone_number,
    PartyB: 174379,
    PhoneNumber: config.phone_number,
    CallBackURL: "https://be72-41-84-159-230.in.ngrok.io/callback",
    AccountReference: "Celo Hackathon",
    TransactionDesc: "Payment of testCelo",
  };

  let _data = axios({
    method: "post",
    url: mpesa_urls.stk_push,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  });

  console.log("Sending Response...");
  const response = await _data;

  res.status(200).send(response.data);
  console.log("Waiting for callback");
};
