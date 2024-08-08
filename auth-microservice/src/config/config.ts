export default () => ({
    port: parseInt(process.env.PORT, 10) || 3001,
    database: {
      host: process.env.MONGO_URL  ||  process.env.DATABASE_STRING
    }
  });