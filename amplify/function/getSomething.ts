// implement a handler

import { Handler } from "aws-lambda";

export const handler: Handler = async (event) => {
  console.log(event);
  return [
    {
      id: "test-id",
      name: "test-name",
    },
  ];
};
