import { RequestHandler } from 'express';
const testServer: RequestHandler = (req, res, next) => {
  try {
    res.json({
      status: true,
      message: 'Hello from test server',
    });
  } catch (err) {
    next(err);
  }
};

export default testServer;
