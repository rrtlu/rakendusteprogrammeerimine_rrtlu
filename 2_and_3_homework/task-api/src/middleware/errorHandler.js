// Four arguments: Express only treats this as an error handler with all four.
export function errorHandler(error, req, res, next) {
  const status = error.status ?? 500;

  if (status >= 500) {
    console.error(error);
  }

  // Stack traces stay in the terminal, not in the response.
  res.status(status).json({
    error: status >= 500 ? 'Internal server error' : error.message,
  });
}
