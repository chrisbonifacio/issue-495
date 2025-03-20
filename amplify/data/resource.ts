import {
  type ClientSchema,
  a,
  defineData,
  defineFunction,
} from "@aws-amplify/backend";

const getSomething = defineFunction({
  entry: "../function/getSomething.ts",
});

const schema = a.schema({
  CustomType: a.customType({
    id: a.string().required(),
    name: a.string().required(),
  }),
  getSomething: a
    .query()
    .arguments({
      arg1: a.string().required(),
    })
    .returns(a.ref("CustomType").required().array().required())
    .handler(a.handler.function(getSomething))
    .authorization((allow) => [allow.groups(["Admin", "User"])]),
  getSomething2: a
    .query()
    .arguments({
      arg1: a.string().required(),
    })
    .returns(a.ref("CustomType").required().array().required())
    .handler(a.handler.function(getSomething))
    .authorization((allow) => [allow.groups(["Admin"])]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "iam",
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
