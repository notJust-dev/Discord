/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

// if you're using common js
const StreamChat = require("stream-chat").StreamChat;

// instantiate your stream client using the API key and secret
// the secret is only used server side and gives you full access to the API
const serverClient = StreamChat.getInstance(
  process.env.STREAM_KEY,
  process.env.STREAM_SECRET
);
// you can still use new StreamChat('api_key', 'api_secret');

// generate a token for the user with id 'john'

exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  if (!event.identity.sub) {
    throw Error("No identity provided");
  }
  const userId = event.identity.sub;

  return serverClient.createToken(userId);
};
