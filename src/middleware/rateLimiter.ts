import expressRateLimit from 'express-rate-limit';

const appLimiter = expressRateLimit({
  windowMs: 1000 * 60 * 5,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

export { appLimiter };
