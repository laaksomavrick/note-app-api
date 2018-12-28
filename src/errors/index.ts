export class HttpError extends Error {
  constructor(public message: string, public status: number, public errors?: object) {
    super();
  }
}

export class ValidationError extends HttpError {
  constructor(errors: object = null) {
    super("The request was invalid", 400, errors);
  }
}

export class NotFoundError extends HttpError {
  constructor(errors: object = null) {
    super("The requested resource was not found", 404, errors);
  }
}

export class ForbiddenError extends HttpError {
  constructor(errors: object = null) {
    super("The requested resource is forbidden", 403, errors);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(errors: object = null) {
    super("The request does not have proper credentials", 401, errors);
  }
}

// {
//     status: 400,
//     message: 'The request was invalid'
//     errors : {
//         password: 'must be length of 8 or greater'
//         email: 'must be provided'
//     }
// }
