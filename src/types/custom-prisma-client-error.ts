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
    typeof (error as { code: unknown }).code === "string" &&
    "clientVersion" in error &&
    typeof (error as { clientVersion: unknown }).clientVersion === "string" &&
    (typeof (error as { meta?: unknown }).meta === "undefined" ||
      typeof (error as { meta?: unknown }).meta === "object") &&
    (typeof (error as { batchRequestIdx?: unknown }).batchRequestIdx ===
      "undefined" ||
      typeof (error as { batchRequestIdx?: unknown }).batchRequestIdx ===
        "number") &&
    typeof (error as unknown as { [Symbol.toStringTag]: unknown })[
      Symbol.toStringTag
    ] === "string"
  );
};
