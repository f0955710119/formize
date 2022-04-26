import type { NextApiRequest, NextApiResponse } from "next";

interface Data {
  status: string;
  status_code: number;
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    // const {questions,answers}
    // if ()
  }
}
