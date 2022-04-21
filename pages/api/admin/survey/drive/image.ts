// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";
import nextConnect from "next-connect";
import multer from "multer";
import credentials from "../../../../../credentials.json";
import path from "path";

const dotenv = require("dotenv");
dotenv.config();

// Google setup
const clientId = credentials.web.client_id;
const clientSecret = credentials.web.client_secret;
const redirectUri =
  process.env.NEXT_PUBLIC_ENV === "development"
    ? credentials.web.redirect_uris[1]
    : credentials.web.redirect_uris[0];

const oAuth2Client = new google.auth.OAuth2({
  clientId,
  clientSecret,
  redirectUri,
});

// For google config
const SCOPES = [
  "https://www.googleapis.com/auth/drive.appdata",
  "https://www.googleapis.com/auth/drive.file",
];

// Multer
const handler = nextConnect();

const storage = multer.diskStorage({
  filename(req, file, callback) {
    callback(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage,
});

const uploadFile = upload.single("file");
handler.use(uploadFile);
handler.post((req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body);
  console.log((req as any).file);

  res.status(200).json({
    message: "h1!",
  });
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
