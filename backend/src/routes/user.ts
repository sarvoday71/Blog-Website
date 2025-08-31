import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import bcrypt from 'bcryptjs'
import { signinInput, signupInput } from '@sarvoday17/common'


const userRoute = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>()

userRoute.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try {
        const body = await c.req.json();
        const { success } = signinInput.safeParse(body);
        if (!success) {
            c.status(400);
            return c.json({
                message: "Invalid Input"
            })
        }
        const email = body['email']

        const finding = await prisma.users.findMany({
            where: {
                email: email
            }
        })

        if (finding.length > 0) {
            c.status(411);
            return c.text('User with provided email already exists !');
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(body.password, salt);
        const user = await prisma.users.create({
            data: {
                name: body['name'],
                email: body['email'],
                password: hashedPassword,
            }
        })

        const jwt = await sign({
            id: user.id
        }, c.env.JWT_SECRET)
        return c.json({ jwt: jwt });
    } catch (error) {
        console.log(error);
        c.status(500);
        return c.json({
            message: "Error signing up"
        });
    }

})





userRoute.post('/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const body = await c.req.json();
        const { success } = signupInput.safeParse(body);
        if (!success) {
            c.status(400);
            return c.json({
                message: "Invalid Input"
            })
        }
        const finding = await prisma.users.findFirst({
            where: {
                email: body.email,
            }
        })

        if (!finding || !bcrypt.compareSync(body.password, finding.password)) {
            c.status(401);
            return c.text('Enter Valid Credentials');
        }

        const jwt = await sign({
            id: finding.id
        }, c.env.JWT_SECRET)
        c.status(200);
        return c.json({ jwt: jwt });
    } catch (error) {
        console.log(error);
        c.status(500);
        return c.json({
            message: "Error signing in"
        });
    }

})

export default userRoute;