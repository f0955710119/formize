import { NextApiRequest, NextApiResponse } from "next";
import firebase from "../../../../src/utils/firebase";
import loginConfig from "../../../../src/configs/loginConfig";

interface Data {
  status: string;
  status_code: number;
  message: string;
  data?: {
    uid?: string;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    const emailRegex = loginConfig.EMAIL_REG;
    const passwordRegex = loginConfig.PASSWORD_REG;

    const invalidEmailRegex = !emailRegex.test(email);
    const invalidPasswordRegex = !passwordRegex.test(password);

    if (invalidEmailRegex && invalidPasswordRegex)
      throw new Error("both email and password are invalid input");

    if (invalidEmailRegex)
      throw new Error("email has invalid input, please try again");

    if (invalidPasswordRegex)
      throw new Error("password has invalid input, please try again");

    try {
      const adminData = await firebase
        .nativeLogin({ email, password })
        .catch((error) => {
          throw new Error("fail to pass native login: " + error.message);
        });
      if (!adminData) {
        throw new Error("this account is not existed, please sign up");
      }
      const { id: uid } = adminData;

      res.status(200).json({
        status: "success",
        status_code: 200,
        message: "login successfully with user data back!",
        data: {
          uid,
        },
      });
    } catch (error: any) {
      res.status(400).json({
        status: "fail",
        status_code: 400,
        message: error.message,
      });
    }
  }
}
