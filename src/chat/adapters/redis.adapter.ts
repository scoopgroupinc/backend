import { IoAdapter } from '@nestjs/platform-socket.io'
import { createClient } from 'redis'
import { ServerOptions } from 'socket.io'
import { createAdapter } from 'socket.io-redis'
import * as config from 'config'

const { host, port } = config.get('redis')
const pubClient = createClient()
{
    //  host,
    //                   port,
    //                   no_ready_check: true,
}
const subClient = pubClient.duplicate()
const redisAdapter = createAdapter({ pubClient, subClient })

export class RedisIoAdapter extends IoAdapter {
    createIOServer(port: number, options?: ServerOptions): any {
        const server = super.createIOServer(4000, { ...options, cors: true })
        server.adapter(redisAdapter)
        return server
    }
}

// export class RedisIoAdapter extends IoAdapter{
//     createIOServer(port:number):any {
//         const server = super.createIOServer(port);
//         const redisAdapter = redisIOAdapter(
//             {
//                 host:process.env.REDIS_HOST,
//                 port:parseInt(process.env.REDIS_PORT),
//             });

//             server.adapter(redisAdapter);

//             return server;
//     }
// }
