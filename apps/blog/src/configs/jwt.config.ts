export const jwtConfig = {
  global: true,
  secret: process.env.JWT_SEC,
  signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
};
