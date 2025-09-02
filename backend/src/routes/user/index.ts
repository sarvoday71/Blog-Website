import { Hono } from 'hono'
import { signUpFuntion, signInFunction } from './handlers'

const userRoute = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>()

userRoute.post('/signup', signUpFuntion);
userRoute.post('/signin', signInFunction);

export default userRoute;