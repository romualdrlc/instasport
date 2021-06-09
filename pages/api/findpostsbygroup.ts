import { NextApiRequest, NextApiResponse } from "next";
import { getAllPostsByGroups } from "../../utils/initDatabase";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const mongoResponse = await getAllPostsByGroups(request.query.groupId);
  // if (mongoResponse.insertedCount === 1) {
  //   response.json({ message: "register OK" });
  // } else {
  //   response.json({ message: "ERROR" });
  // }
};