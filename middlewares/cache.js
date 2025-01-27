const cache = {};

const cacheMiddleware = (duration) => (req, res, next) => {
  const key = req.originalUrl || req.url;
  if (cache[key]) {
    return res.json(cache[key]);
  } else {
    res.sendResponse = res.json;
    res.json = (body) => {
      cache[key] = body;
      setTimeout(() => delete cache[key], duration * 1000);
      res.sendResponse(body);
    };
    next();
  }
};

module.exports = { cacheMiddleware }; 