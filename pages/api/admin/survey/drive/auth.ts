import type { NextApiRequest, NextApiResponse } from "next";

// const { google } = require("googleapis");
// import credentials from "../../../../../credentials.json";

const dotenv = require("dotenv");
dotenv.config();

// const clientId = credentials.web.client_id;
// const clientSecret = credentials.web.client_secret;
// const redirectUri =
//   process.env.NEXT_PUBLIC_ENV === "development"
//     ? credentials.web.redirect_uris[1]
//     : credentials.web.redirect_uris[0];

// const oAuth2Client = new google.auth.OAuth2({
//   clientId,
//   clientSecret,
//   redirectUri,
// });


// // For google config
// const SCOPES = [
//   "https://www.googleapis.com/auth/drive.appdata",
//   "https://www.googleapis.com/auth/drive.file",
// ];

interface Data {
  status: string;
  status_code: number;
  message: string;
  data?: {
    uri?: string;
    token?: string;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    res.status(200).json({
      status: "success",
      status_code: 200,
      message: "get drive access successfully!",
    });
    // const authUrl = oAuth2Client.generateAuthUrl({
    //   access_type: "offline",
    //   scope: SCOPES,
    // });

    // res.status(200).json({
    //   status: "success",
    //   status_code: 200,
    //   message: "get drive access successfully!",
    //   data: {
    //     uri: authUrl,
    //   },
    // });
  }

  // if (req.method === "POST") {
  //   if (req.body.code === null) {
  //     res.status(400).json({
  //       status: "fail",
  //       status_code: 400,
  //       message: "there is no code to access token",
  //     });
  //     return;
  //   }

  //   try {
  //     const { tokens } = await oAuth2Client.getToken(req.body.code);
  //     oAuth2Client.setCredentials(tokens);
  //     res.status(200).json({
  //       status: "success",
  //       status_code: 200,
  //       message: "get drive access successfully!",
  //       data: {
  //         ...tokens,
  //       },
  //     });
  //   } catch (error: any) {
  //     console.error(error.message);
  //     res.status(400).json({
  //       status: "fail",
  //       status_code: 400,
  //       message: "fail to get token: " + error.message,
  //     });
  //   }
  // }
}
