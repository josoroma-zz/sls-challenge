export const handler = async (event, context) => {
  const {
    body,
    headers,
    httpMethod,
    path,
    pathParameters,
    queryStringParameters,
    resource,
  } = event;

  const {
    functionName,
    invokedFunctionArn,
    logGroupName,
    logStreamName,
  } = context;

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify(
      {
        message: "Serverless function executed successfully!",
        // Event
        body,
        headers,
        httpMethod,
        path,
        pathParameters,
        queryStringParameters,
        resource,
        // Context
        functionName,
        invokedFunctionArn,
        logGroupName,
        logStreamName,
      },
      null,
      2
    ),
  };
};
