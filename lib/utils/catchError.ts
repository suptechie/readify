import { ErrorMessage, StatusCode } from "@/types";
import { NextResponse } from "next/server";

//eslint-disable-next-line
const catchError = (error:any)=>{
    const errorMessage = error instanceof Error ? error.message : ErrorMessage.ERROR_DEFAULT;
    return NextResponse.json(
      { error: errorMessage },
      { status: StatusCode.InternalServerError }
    );
}

export default catchError;