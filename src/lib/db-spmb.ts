import { Prisma, PrismaClient } from "@prisma-db-spmb/client";

// Extend the global object to include prismaDbSpmb
declare global {
  // eslint-disable-next-line no-var
  var prismaDbSpmb: PrismaClient | undefined;
}

const globalForPrisma = global as typeof global & {
  prismaDbSpmb?: PrismaClient;
};

export const dbSpmb = globalForPrisma.prismaDbSpmb || new PrismaClient();

if (process.env.NODE_ENV !== "production")
  globalForPrisma.prismaDbSpmb = dbSpmb;

export { Prisma };
