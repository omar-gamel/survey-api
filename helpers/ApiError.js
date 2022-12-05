class ApiError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
    this.name = 'ApiError';
  }

  static NotFound(name) {
    this.status = 404;
    this.message = `${name} Not Found`;
    this.name = 'ApiError';
  }

  static BadRequest(message = 'Bad Request, Check your inputs') {
    this.status = 400;
    this.message = message;
    this.name = 'ApiError';
  }

  static UnprocessableEntity(message) {
    this.status = 422;
    this.message = message;
    this.name = 'ApiError';
  }

  static Forbidden(message) {
    this.status = 403;
    this.message = message;
    this.name = 'ApiError';
  }
}

export default ApiError;
