/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STREAM_KEY
	STREAM_SECRET
Amplify Params - DO NOT EDIT */

const StreamChat = require("stream-chat").StreamChat;

const { STREAM_KEY, STREAM_SECRET } = process.env;

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  if (!event?.identity?.sub) {
    return "";
  }

  const client = StreamChat.getInstance(STREAM_KEY, STREAM_SECRET);

  const token = client.createToken(event.identity.sub);

  return token;
};
