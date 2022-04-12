import { RequestHandler } from 'express';
const testServer: RequestHandler = async (req, res, next) => {
  try {
    res.json({
      status: true,
      message: 'Hello from test server',
    });
  } catch (err) {
    // console.log(err);
    // res.status(500).json({
    //   status: false,
    //   message: 'server error!',
    // });
    next(err);
  }
};

export default testServer;
