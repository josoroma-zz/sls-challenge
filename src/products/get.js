import handler from "../libs/handler";

export const main = handler(async (event, context) => {
  return {
    data: "Serverless function executed successfully!",
  };
});
