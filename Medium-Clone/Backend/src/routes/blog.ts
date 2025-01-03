import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import { createBlogInput, updateBlogInput } from "@sushant398/medium-back";
type Variables = {
  userId: string
}

type JwtPayload = {
  id: string;
  email: string;
  name?: string;
};


export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  },
  Variables: Variables
}>()


// Middleware
blogRouter.use("/*", async (c, next) => {
  const authHeader = c.req.header("authorization") || "";
  try {
    const user = await verify(authHeader, c.env.JWT_SECRET) as JwtPayload;
    if (user.id) {
      c.set("userId", user.id);
      await next()
    }
    else {
      c.status(403)
      return c.json({ error: "unauthorized" })
    }
  }
  catch (err) {
    c.status(403);
    return c.json({ message: "user not logged in" })
  }

})


//will do pagination
blogRouter.get('/bulk', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const blogs = await prisma.post.findMany();

  return c.json({ blogs });
})

blogRouter.get('/:id', async (c) => {
  const id = c.req.param("id")
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  try {
    const blog = await prisma.post.findFirst({
      where: {
        id: id
      }
    })
    return c.json({ blog })
  }
  catch (e) {
    console.log(e)
    c.status(411)  // check correct status code and description 
    return c.json({ message: "Error while fetching blog post" })
  }
})

blogRouter.post('/', async (c) => {
  const body = await c.req.json();
  const userId = c.get("userId")
  const { success } = createBlogInput.safeParse(body)
  if (!success) {
    c.status(411)
    return c.json({ message: "Wrong Input" })
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const blog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: userId   //will extract the userId from middleware ,right now hard coding
    }
  })
  return c.json({ id: blog.id })
})


blogRouter.put('/', async (c) => {
  const body = await c.req.json()
  const { success } = updateBlogInput.safeParse(body)
  if (!success) {
    c.status(411)
    return c.json({ message: "Wrong Input" })
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const blog = await prisma.post.update({
    where: {
      id: body.id
    },
    data: {
      title: body.title,
      content: body.content,
    }
  })
  return c.json({ id: blog.id })
})



