import { Application, Router } from "https://deno.land/x/oak@v10.0.0/mod.ts";
import { applyGraphQL } from "https://deno.land/x/oak_graphql@0.6.4/mod.ts";
import { CORS } from "https://deno.land/x/oak_cors@v0.1.1/mod.ts";
import { typeDefs } from "./graphql/Schema.ts";
import { resolvers } from "./graphql/Resolvers.ts";

const app = new Application();

const GraphQLService = await applyGraphQL<Router>({
  Router,
  typeDefs: typeDefs,
  resolvers: resolvers,
  usePlayground: true
})

app.use(CORS());
app.use(GraphQLService.routes(), GraphQLService.allowedMethods());

console.log("GraphQl server start at http://localhost:8080/graphql");
await app.listen({ port: 8080 });