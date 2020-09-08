const response = ({ body, context, debug, event, stage, timestamp }) => {
  const response =
    debug && stage === "dev"
      ? {
          ...body,
          debug: {
            context,
            event: {
              body: event.body,
              httpMethod: event.httpMethod,
              path: event.path,
              pathParameters: event.pathParameters,
              queryStringParameters: event.queryStringParameters,
              requestContext: {
                accountId: event.requestContext.accountId,
                stage,
              },
            },
            timestamp,
          },
        }
      : body;

  return JSON.stringify(response);
};

export default response;
