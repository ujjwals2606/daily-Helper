export const asyncHandler = (handler) => async (req, res, next) => {
  try {
    await handler(req, res, next);
  } catch (error) {
    next(error);
  }
};

export const sendResponse = (res, statusCode, payload) => {
  return res.status(statusCode).json(payload);
};


