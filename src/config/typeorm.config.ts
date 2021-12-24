import {TypeOrmModuleOptions} from '@nestjs/typeorm'
import * as config from 'config'

const {type,host,port,username,password,database,synchronize} = config.get('DB');
console.log(host)
export const typeOrmConfig:TypeOrmModuleOptions={
   
 type:type,
 host: process.env.RDS_HOSTNAME|| host, ///point this to the DB host localhost for develpment or instaclustr
 port:process.env.RDS_PORT||port, // default port for postgres is 5432
 username:process.env.RDS_USERNAME||username, //DB username here
 password:process.env.RDS_PASWORD||password, //Db password goes here
 database: process.env.RDS_DB_NAME||database,  //Name of Database goes here
 entities:[__dirname+'/../**/*.entity.ts'], // Gets all entities with extension .entity.ts
 synchronize: process.env.TYPEORM_SYC || synchronize
}