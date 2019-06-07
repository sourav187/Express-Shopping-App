const env = process.env.NODE_ENV; // 'dev' or 'test'

const dev = {
 app: {
   port: parseInt(process.env.DEV_APP_PORT) || 3000
 },
 db: {
   host: process.env.DEV_DB_HOST || 'localhost',
   port: parseInt(process.env.DEV_DB_PORT) || 27017,
   name: process.env.DEV_DB_NAME || 'db',
   user: process.env.DEV_DB_USER,
   password: process.env.DEV_DB_PASSWORD
 }
};
const test = {
 app: {
   port: parseInt(process.env.TEST_APP_PORT) || 3000
 },
 db: {
   host: process.env.TEST_DB_HOST || 'localhost',
   port: parseInt(process.env.TEST_DB_PORT) || 27017,
   name: process.env.TEST_DB_NAME || 'test',
   user: process.env.TEST_DB_USER,
   password: process.env.TEST_DB_PASSWORD
 }
};

const config = {
 dev,
 test
};

module.exports = config[env];