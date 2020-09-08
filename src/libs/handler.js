/**
 * https://serverless-stack.com/chapters/setup-error-logging-in-serverless.html
 * https://github.com/KyleRoss/node-lambda-log
 */

import log from "lambda-log";
import response from "./response";
import headers from "./headers";

// Enable or disable debug messages.
log.options.debug = true;

// Add timestamp to each log.
const timestamp = new Date().toISOString();
log.options.dynamicMeta = (message) => ({
  timestamp,
});

const handler = (lambda) => async (event, context) => {
  let body;
  let statusCode;

  // Add additional stage tag to all logs.
  const stage = event.requestContext.stage;
  log.options.tags.push(stage);
  // Set some optional metadata to be included in all logs.
  log.options.meta.event = event;
  log.options.meta.context = context;

  try {
    // Debug custom message plus the optional metadata.
    // log.debug("--- DEBUG ---");
    // Run the Lambda and set part of the HTTP response.
    body = await lambda(event, context);
    statusCode = 200;
  } catch (e) {
    // Log error plus the optional metadata.
    log.error(e);
    // Set part of the HTTP response.
    body = { error: e.message };
    statusCode = 500;
  }

  const bodyResponse = response({
    body,
    context,
    debug: log.options.debug,
    event,
    stage,
    timestamp,
  });

  // Return HTTP response.
  return {
    statusCode,
    body: bodyResponse,
    headers,
  };
};

export default handler;
