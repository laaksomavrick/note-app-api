export class HttpError extends Error {
  constructor(
    public message: string,
    public status: number,
    public errors?: object,
  ) {
    super();
  }
}

export class ValidationError extends HttpError {
  constructor(errors: object = null) {
    super("The request was invalid", 400, errors);
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
