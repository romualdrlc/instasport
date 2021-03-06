import { NextApiRequest, NextApiResponse } from "next";
import { getUsersPhotoByToken } from "../../utils/initDatabase";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  console.log("⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️", request.query);
  const mongoResponse = await getUsersPhotoByToken(request.query.usersToken);

  console.log("reponse appel db", mongoResponse);

  response.json(mongoResponse);
};
