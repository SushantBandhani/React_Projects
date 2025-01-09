import { Hono } from "hono";
import {PrismaClient} from '@prisma/client/edge'
import {withAccelerate} from '@prisma/extension-accelerate'
import {sign} from 'hono/jwt'
import { signupInput,signinInput } from "@sushant398/medium-back";
import { deriveKey,generateSalt,verifyPassword } from "../../hashPass";

export const userRouter=new Hono<{
    Bindings:{
      DATABASE_URL:string,
      JWT_SECRET:string
    }
  }>()

  
userRouter.post('/signup', async(c) => {
  console.log("I am here")
    const body = await c.req.json()
    const {success}=signupInput.safeParse(body)
    if(!success){
      c.status(411)
      return c.json({message:"Wrong Input"})
    }
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
    try{
        // Example Usage
      const salt = generateSalt(16); // Generate a 16-byte salt
      const hashedPassword =await deriveKey(body.password, salt);
      
      const user=await prisma.user.create({
          data:{
            name:body.name,
            email:body.email,
            password:hashedPassword,
            salt:salt
          }
        })
      
        const token= await sign({id:user.id},c.env.JWT_SECRET)
        return c.json({
          jwt:token
        })    
    }
    catch(e){   
      c.status(411);
      return c.text('User already exists with this email')
    }
  
  })
  
  
userRouter.post('/signin', async(c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    const body = await c.req.json()
    const {success}=signinInput.safeParse(body)
    if(!success){
      c.status(411)
      return c.json({message:"Wrong Input"})
    }
    const user=await prisma.user.findUnique({
        where:{
          email:body.email,
        }
      })
  
      if(!user){
        c.status(403)
        return c.json({error:"user not found"})
      }
      
      const isValid = await verifyPassword(body.password, user.password, user.salt);
      if (isValid) {
          console.log("Password is correct!");
      } else {
          console.log("Invalid password!");
          return c.json({
            message:"Invaid password"
          })
      }
      const token= await sign({id:user.id},c.env.JWT_SECRET)
      return c.json({
        jwt:token
      })
  })


