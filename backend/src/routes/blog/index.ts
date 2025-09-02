import { Hono } from 'hono'
import { getAllBlogs, authorBlogs, getBlogByID, blogPost, blogPut } from './handlers'
import { authMiddleware } from './middleware';

const blogRoute = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
    Variables: {
        authId: string
    }
}>()

blogRoute.use('/*', authMiddleware);

blogRoute.get('/bulk', getAllBlogs);
blogRoute.get('/author', authorBlogs);
blogRoute.get('/:id', getBlogByID);
blogRoute.post('/', blogPost);
blogRoute.put('/', blogPut);

export default blogRoute;