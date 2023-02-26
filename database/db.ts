import sql from 'mssql';


const config = {
  database: 'FB_A67811_luiscarvajal2693',
  server: '100.42.69.119',
  user: 'sa',
  password: 'yourStrong(!)Password',
  driver: 'msnodesqlv8',
  options: {
    trustedConnection: false,
    trustServerCertificate: true
  }
}

export const executeQuery = async (query: any, option?: any) => {
  try {
    const pool = await sql.connect(config);
    return await pool.request().query(query);
  } catch (err) {
    console.log(err)
  }
}

