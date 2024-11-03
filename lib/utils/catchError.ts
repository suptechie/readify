import { CustomError, ErrorMessage, StatusCode } from "@/types";
import { NextResponse } from "next/server";

//eslint-disable-next-line
const catchError = (error: any) => {
  if (error instanceof CustomError) {
    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode }
    );
  } else if (error instanceof Error) {
    console.log(error);
    return NextResponse.json(
      { error: error.message || ErrorMessage.ERROR_DEFAULT },
      { status: StatusCode.InternalServerError }
    );
  }
};

export default catchError;