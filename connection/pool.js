import mysql from 'mysql2/promise'

const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'hackaton'
});

// const pool = mysql.createPool({
//     host: process.env.MYSQL_HOST ?? 'localhost',
//     user: process.env.MYSQL_USER ?? 'root',
//     port: process.env.MYSQL_PORT ?? 3306,
//     password: process.env.MYSQL_PASSWORD ?? '',
//     database: process.env.MYSQL_DATABASE ?? 'hackaton'
//   })
  // const pool = mysql.createPool({
  //   host: process.env.MYSQL_HOST ,
  //   user: process.env.MYSQL_USER ,
  //   port: process.env.MYSQL_PORT,
  //   password: process.env.MYSQL_PASSWORD ,
  //   database: process.env.MYSQL_DATABASE
  // })
export default pool;