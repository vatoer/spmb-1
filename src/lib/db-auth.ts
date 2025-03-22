import { Prisma, PrismaClient } from "@prisma-db-auth/client";

// Extend the global object to include prismaDbAuth
declare global {
  // eslint-disable-next-line no-var
  var prismaDbAuth: PrismaClient | undefined;
}

const globalForPrisma = global as typeof global & {
  prismaDbAuth?: PrismaClient;
};

export const dbAuth = globalForPrisma.prismaDbAuth || new PrismaClient();

if (process.env.NODE_ENV !== "production")
  globalForPrisma.prismaDbAuth = dbAuth;

export { Prisma };
