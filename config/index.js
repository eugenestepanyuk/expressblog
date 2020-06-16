const config = {
    port: process.env.PORT,
    mongoURI: process.env.MONGOURI,
    environment: process.env.NODE_ENV || "production",
    jwt: {
      secret: process.env.JWT_SECRET,
    },
  };
  
  module.exports = config;