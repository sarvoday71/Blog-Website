import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

export const getPrismaClientOne = (datasourceUrl: string) => {
    return new PrismaClient({ datasourceUrl }).$extends(withAccelerate());
};
