import { isCustomPrismaClientError } from "@/types/custom-prisma-client-error";
import { ErrorResponse } from "@/types/response";

export const getPrismaErrorResponse = (
  error: unknown,
  text?: string
): ErrorResponse => {
  const dataText = text ? text : ``;
  // TODO: check jika error bukan dari db auth tapi dari db lainnya
  if (isCustomPrismaClientError(error)) {
    switch (error.code) {
      case `P2000`:
        return {
          success: false,
          error: error.code,
          message: `${dataText} The provided value for the column is too long for the column's type`,
        };
      case `P2001`:
        return {
          success: false,
          error: error.code,
          message: `${dataText} The record searched for does not exist`,
        };
      case `P2002`:
        return {
          success: false,
          error: error.code,
          message: `${dataText} The record already exists`,
        };
      case `P2003`:
        return {
          success: false,
          error: error.code,
          message: `${dataText} is being referenced by other data`,
        };
      case `P2004`:
        return {
          success: false,
          error: error.code,
          message: `${dataText} A constraint failed`,
        };
      case `P2005`:
        return {
          success: false,
          error: error.code,
          message: `${dataText}  The value stored in the database for the field is invalid for the field's type`,
        };
      case `P2006`:
        return {
          success: false,
          error: error.code,
          message: `${dataText} The provided value is not valid`,
        };
      case `P2007`:
        return {
          success: false,
          error: error.code,
          message: `${dataText} Data validation error`,
        };
      case `P2008`:
        return {
          success: false,
          error: error.code,
          message: `${dataText} Failed to parse the query`,
        };
      case `P2009`:
        return {
          success: false,
          error: error.code,
          message: `${dataText} Failed to validate the query`,
        };
      case `P2010`:
        return {
          success: false,
          error: error.code,
          message: `${dataText} query failed`,
        };
      case `P2011`:
        return {
          success: false,
          error: error.code,
          message: `${dataText} Null constraint violation`,
        };
      case `P2012`:
        return {
          success: false,
          error: error.code,
          message: `${dataText} Missing a required value`,
        };
      case `P2013`:
        return {
          success: false,
          error: error.code,
          message: `${dataText} Missing the required argument`,
        };
      case `P2015`:
        return {
          success: false,
          error: error.code,
          message: `${dataText} A related record could not be found`,
        };
      case `P2018`:
        return {
          success: false,
          error: error.code,
          message: `${dataText} The required connected records were not found`,
        };
      case `P2019`:
        return {
          success: false,
          error: error.code,
          message: `${dataText} Input error`,
        };
      case `P2020`:
        return {
          success: false,
          error: error.code,
          message: `${dataText} Value out of range for the type`,
        };
      case `P2021`:
        return {
          success: false,
          error: error.code,
          message: `${dataText} does not exist in the current database.`,
        };
      case `P2022`:
        return {
          success: false,
          error: error.code,
          message: `${dataText} The column does not exist in the current database.`,
        };
      case `P2025`:
        return {
          success: false,
          error: `${dataText} not found`,
          message: `${dataText} not found`,
        };
      case `P2037`:
        return {
          success: false,
          error: error.code,
          message: `Too many database connections opened`,
        };
      default:
        break;
    }
  }
  console.log(error);
  return {
    success: false,
    error: "UE-PER-001",
    message: `${dataText} Error`,
  };
};
