import {HttpErrorResponse} from '@angular/common/http';

// Todo: If application grows further we could intercept the http errors globally in its own service
export function createErrorMessageForUser(error: any): string {
  let errMsg: string
  if (error instanceof HttpErrorResponse) {
    errMsg = `Server error occurred (status: ${error.status})\n`;
    if (error.error?.errors && error.error.errors[0].defaultMessage) {
      errMsg += error.error.errors[0].defaultMessage;
    }
  } else if (error instanceof Error) {
    errMsg = `An error occurred: ${error.message}`;
  } else {
    errMsg = "Unknown error occurred"
  }

  return errMsg;
}
