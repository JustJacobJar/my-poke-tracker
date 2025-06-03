import type { NextApiRequest, NextApiResponse } from "next";

export async function POST(request: Request) {
  //get request
  const data = request.body;
  //do things, eg validate, submit to db...
  // const id = await createItem(data);

  //returns response with status + json
  return Response.json(data);
}
