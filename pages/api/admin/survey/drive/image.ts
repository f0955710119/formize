import type { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";
import nextConnect from "next-connect";
import multer from "multer";
import credentials from "../../../../../credentials.json";
import path from "path";
import fs from "fs";
import formidable from "formidable";

const form = formidable({ multiples: false });

async function parseMultipartForm(req: any, res: any, next: any) {
  const contentType = req.headers["content-type"];
  if (contentType && contentType.indexOf("multipart/form-data") !== -1) {
    form.parse(req, (err, fields, file) => {
      if (!err) {
        req.body = fields; // sets the body field in the request object
        req.file = file; // sets the files field in the request object
      }
      next(); // continues to the next middleware or to the route
    });
  } else {
    next();
  }
}

const middleware = nextConnect();

middleware.use(parseMultipartForm);

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

// const storage = multer.diskStorage({
//   filename(req, file, callback) {
//     callback(
//       null,
//       file.fieldname + "_" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });

// const upload = multer({
//   storage,
// });

async function uploadImage(accessToken: string, form: any) {
  const xhr = new XMLHttpRequest();
  xhr.open(
    "post",
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id"
  );
  xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
  xhr.responseType = "json";
  xhr.onload = () => {
    console.log(xhr.response.id);
  };
  xhr.send(form);
}
interface Data {
  status: string;
  status_code: number;
  message: string;
  data?: {
    imageURL?: string;
  };
}
// const upload = multer({ dest: "uploads/" });

// const uploadFile = upload.single("file");

handler.use(middleware);
handler.post(async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  // console.log(JSON.parse(JSON.stringify(req.body.token)));
  // console.log((req as any).file);

  const token = JSON.parse(JSON.stringify(req.body.token));
  const file = (req as any).file;
  console.log(token.access_token);
  console.log(file);

  if (token === null || token.access_token === "") {
    res.status(400).json({
      status: "fail",
      status_code: 400,
      message: "can't upload image without token",
    });
    return;
  }

  oAuth2Client.setCredentials(token);
  const form = new FormData();
  const fileMetaData = {
    name: file.file.originalFilename,
    mimeType: file.file.mimetype,
  };
  form.append(
    "metadata",
    new Blob([JSON.stringify(fileMetaData)], { type: "application/json" })
  );
  form.append("file", file);

  // await uploadImage(token.access_token, form);
  // const drive = google.drive({ version: "v3", auth: oAuth2Client });

  // const fileMetaData = {
  //   name: file.name,
  // };

  // const media = {
  //   mimeType: file.type,
  //   body: file,
  // };

  // drive.files.create({
  //   requestBody: fileMetaData,
  //   media,
  //   fields: "id",
  // });

  res.status(201).json({
    status: "success",
    status_code: 201,
    message: "upload file successfully",
  });
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
