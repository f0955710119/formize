// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");
const Cors = require("cors");
import credentials from "../../../../credentials.json";

const dotenv = require("dotenv");
dotenv.config();

const clientId = credentials.web.client_id;
const clientSecret = credentials.web.client_secret;
const redirectUri =
  process.env.NODE_ENV === "development"
    ? credentials.web.auth_uri[1]
    : credentials.web.auth_uri[0];

const oAuth2Client = new google.auth.OAuth2({
  clientId,
  clientSecret,
  redirectUri,
});

// For google config
const SCOPES = ["https://www.googleapis.com/auth/drive"];

interface Data {
  status: string;
  status_code: number;
  message: string;
  data?: {
    uri: string;
  };
}

const cors = Cors({
  methods: ["GET", "HEAD"],
});

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
  fn: any
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await runMiddleware(req, res, cors);
  console.log(clientId);
  if (req.method === "GET") {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
    });

    res.status(200).json({
      status: "success",
      status_code: 200,
      message: "get drive access successfully!",
      data: {
        uri: authUrl,
      },
    });
  }
}
