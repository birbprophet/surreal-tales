import * as functions from "firebase-functions"
var stream = require("getstream")

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  const user_id = request.body.user_id
  let client = stream.connect(
    "zvqc7wggt7k9",
    "24q9r5hu9gxakfsae9ubnue7tde5z7x5fffz6z6hjb5g28v5tzdt3m88xy2ycmaf"
  )
  let userToken = client.createUserToken(user_id)

  response.send(userToken)
})
