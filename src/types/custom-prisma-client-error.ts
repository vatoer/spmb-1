export interface CustomPrismaClientError extends Error {
  code: string;
  meta?: Record<string, unknown>;
  clientVersion: string;
  batchRequestIdx?: number;
  get [Symbol.toStringTag](): string;
}

// Type guard to check if an error matches the CustomPrismaClientError structure
export const isCustomPrismaClientError = (
  error: unknown
): error is CustomPrismaClientError => {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof (error as any).code === "string" &&
    "clientVersion" in error &&
    typeof (error as any).clientVersion === "string" &&
    (typeof (error as any).meta === "undefined" ||
      typeof (error as any).meta === "object") &&
    (typeof (error as any).batchRequestIdx === "undefined" ||
      typeof (error as any).batchRequestIdx === "number") &&
    typeof (error as any)[Symbol.toStringTag] === "string"
  );
};
