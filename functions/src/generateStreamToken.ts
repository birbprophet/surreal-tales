import * as cors from "cors"
const functions = require("firebase-functions")
const stream = require("getstream")

const corsHandler = cors({ origin: true })

const client = stream.connect(
  "zvqc7wggt7k9",
  "24q9r5hu9gxakfsae9ubnue7tde5z7x5fffz6z6hjb5g28v5tzdt3m88xy2ycmaf"
)

export const generateStreamToken = functions.https.onRequest(
  (req: any, res: any) => {
    corsHandler(req, res, () => {})

    const token = client.createUserToken(req.body.userId)
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS")
    res.header("Access-Control-Allow-Headers", "Content-Type")
    res.send({ token })
  }
)
