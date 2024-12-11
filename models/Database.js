require("dotenv").config();

async function connect(){
  if(global.connection && global.connection.state !== 'disconnected')
      return global.connection;
    const mysql = require("mysql2/promise");
    
    const connection = await mysql.createConnection({
      host: 'db4free.net',
      port: 3306,
      user: 'curso132',
      password: 'senha123',
      database: 'mvc123'
    });
  console.log("Conectou no MySQL!");
  global.connection = connection;
  return connection;
}

async function query(sql){
  const conn = await connect();
  const [rows] = await conn.query(sql);
	return rows;
}

module.exports={query}
