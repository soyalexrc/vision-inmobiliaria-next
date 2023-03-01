import sql from 'mssql';


const config = {
  database: 'DB_A67811_luiscarvajal2693',
  server: '100.42.69.119',
  user: 'sa',
  password: 'yourStrong(!)Password',
  driver: 'msnodesqlv8',
  options: {
    trustedConnection: true,
    trustServerCertificate: true
  }
}

// export const executeQuery = async (query: any, option?: any) => {
//   try {
//     const pool = await sql.connect(config);
//     return await pool.request().query(query);
//   } catch (err) {
//     console.log(err)
//   }
// }

const poolPromise: any  = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL');
    return pool
  })
  .catch(err => console.log('Database Connectio Failed!. Bad Config: ', err))

export {
  poolPromise,
  sql
}

