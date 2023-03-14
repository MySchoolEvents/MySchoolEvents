import type { NextApiRequest, NextApiResponse } from "next";
import { admin } from "../../firebase/admin"

export default function handler(req: NextApiRequest, res: NextApiResponse) {

  // get user's uid
  const uid = req.body.uid;

  admin.auth().setCustomUserClaims(uid, { admin: true }).then(() => {
    // The new custom claims will propagate to the user's ID token the
    // next time a new one is issued.
    res.status(200).json({ message: `Success! ${uid} has been made an admin.` });
  })
    .catch((error: any) => {
      res.status(500).json({ error });
    })






}
