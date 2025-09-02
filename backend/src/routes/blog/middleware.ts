import type { Context } from 'hono';
import { verify } from 'hono/jwt';

export const authMiddleware = async (c: Context<{ Bindings: { DATABASE_URL: string; JWT_SECRET: string }, Variables: { authId: string } }>, next: () => Promise<void>) => {
    const authHeader = c.req.header("Authorization") || "";
    try {
        const user = await verify(authHeader, c.env.JWT_SECRET);

        if (user && typeof user === 'object' && 'id' in user && typeof user.id === 'string') {
            c.set('authId', user.id);
            await next();
        } else {
            c.status(403);
            return c.text("You are not logged in");
        }

    } catch (error) {
        console.log(error);
        c.status(403);
        return c.text("Authorization failed for given user");
    }
};
