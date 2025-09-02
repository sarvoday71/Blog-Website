import { Context } from 'hono'
import { createPostInput, updatePostInput } from './validators'
import { getPrismaClientOne } from '../../lib/prisma'

export const getAllBlogs = async (c: Context<{ Bindings: { DATABASE_URL: string; JWT_SECRET: string }, Variables: { authId: string } }>) => {
    const prisma = getPrismaClientOne(c.env.DATABASE_URL);

    try {
        const posts = await prisma.post.findMany({
            where: {
                isPublished: true
            },
            include: {
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });
        c.status(200);
        return c.json({ posts: posts });
    } catch (error) {
        console.log(error);
        c.status(404);
        return c.text("Unable to find all posts");
    }


}

export const authorBlogs = async (c: Context<{ Bindings: { DATABASE_URL: string; JWT_SECRET: string }, Variables: { authId: string } }>) => {
    const prisma = getPrismaClientOne(c.env.DATABASE_URL);

    try {
        console.log("entering in the try block");
        const id = c.get('authId');
        console.log("Try block before printing id");

        console.log(id);
        // write database query to fetch all the post for the particular author id.
        const PostOfAuthor = await prisma.post.findMany({
            where: {
                authorid: id
            }
        })
        c.status(200);
        return c.json({ posts: PostOfAuthor });

    } catch (e) {
        console.log(e);
        c.status(404);
        return c.text("Unable to find post for given author")
    }
}

export const getBlogByID = async (c: Context<{ Bindings: { DATABASE_URL: string; JWT_SECRET: string }, Variables: { authId: string } }>) => {
    const prisma = getPrismaClientOne(c.env.DATABASE_URL);

    try {
        const id = c.req.param('id');
        console.log(id);
        const post = await prisma.post.findFirst({
            where: {
                id: id
            },
            include: {
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
        if (!post) {
            c.status(404);
            return c.json({ message: "Not able to find the post with provided id" });
        }
        return c.json(post);
    } catch (error) {
        console.log(error);
        return c.text("Unable to found post with provided id");
    }
}


export const blogPost = async (c: Context<{ Bindings: { DATABASE_URL: string; JWT_SECRET: string }, Variables: { authId: string } }>) => {

    const prisma = getPrismaClientOne(c.env.DATABASE_URL);

    try {
        const body = await c.req.json();
        const { success } = createPostInput.safeParse(body);
        if (!success) {
            c.status(400);
            return c.json({
                message: "Invalid Input"
            })
        }
        const authorId = c.get('authId');
        const blogPost = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorid: authorId,
                isPublished: body.isPublished
            }
        })
        return c.json({ blogPost: blogPost });
    } catch (error) {
        console.log(error);
        return c.text("unable to create blog post");
    }

}

export const blogPut = async (c: Context<{ Bindings: { DATABASE_URL: string; JWT_SECRET: string }, Variables: { authId: string } }>) => {

    const prisma = getPrismaClientOne(c.env.DATABASE_URL);

    try {
        const body = await c.req.json();
        const { success } = updatePostInput.safeParse(body);
        if (!success) {
            c.status(400);
            return c.json({
                message: "Invalid Input"
            })
        }
        const updatedOne = await prisma.post.update({
            where: {
                id: body.id,
            },
            data: {
                title: body.title,
                content: body.content,
                isPublished: body.isPublished
            }
        });

        return c.json(updatedOne);
    } catch (error) {
        console.log(error);
        return c.text("Error while updating the post");
    }

}
