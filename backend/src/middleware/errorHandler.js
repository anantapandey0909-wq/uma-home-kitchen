/**
 * Global Express error handling middleware
 */
const errorHandler = (err, req, res, next) => {
  console.error('Unhandled Server Error:');
  console.error(err);

  // Default error properties
  let statusCode = 500;
  let message = 'Internal Server Error';

  // Handle specific database, route or syntax errors
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = err.message;
  } else if (err.code === 'P2002') { // Prisma unique constraint error code
    statusCode = 400;
    message = 'A record with this unique value already exists.';
  } else if (err.code === 'P2025') { // Prisma record not found code
    statusCode = 404;
    message = 'The requested record was not found.';
  } else if (err.status) {
    statusCode = err.status;
    message = err.message;
  } else if (process.env.NODE_ENV === 'development') {
    // Expose error details in development
    message = err.message || message;
  }

  res.status(statusCode).json({
    success: false,
    message: message
  });
};

module.exports = errorHandler;
