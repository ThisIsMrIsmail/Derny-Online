const mysql = require("mysql2/promise")

// ========================================
//  Pool connection
// ========================================
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'pms',
  insecureAuth : true,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0
});

pool.on('connection', () => {
  console.log("===================================");
  console.log("✅ Database connected successfully");
  console.log("===================================");
});

module.exports = pool;


// ========================================
//  Database connection
// ========================================
// const conn  = mysql.createConnection({ 
//   connectionLimit: 10,
//   host: process.env.DB_HOST || 'localhost',
//   port: process.env.DB_PORT,
//   user: process.env.DB_USERNAME || 'root',
//   password: process.env.DB_PASSWORD || '',
//   database: process.env.DB_NAME || 'pms',
//   insecureAuth : true
//   // ,options: { encrypt: true }
// });
// conn.connect( (err) => {
//   if (err) {
//     console.log("🟥 Database NOT connected");
//     console.log("--------------------------");
//     console.log(err);
//   } else {
//     console.log("✅ Database connected");
//     console.log("----------------------");
//   }
// });

// module.exports = conn;