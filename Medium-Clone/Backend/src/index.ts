import { Hono } from "hono";
import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";
import { cors } from "hono/cors";
import { verify } from "hono/jwt";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.use("/*", cors());
app.use("api/v1/user", async (c, next) => {
  const header = c.req.header("Authorization") || "";
  const response = await verify(header, c.env.JWT_SECRET);
  if (response.id) {
    next();
  } else {
    c.status(403);
    return c.json({ error: "Unauthorised" });
  }
});

app.route("api/v1/user", userRouter);
app.route("api/v1/blog", blogRouter);

export default app;
