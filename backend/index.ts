const ioredis = require('ioredis');
const { serve } = require('bun');

const redis = new ioredis({
  host: 'localhost',
  port: 6379
});

// serve({
//   port: 3000,
//   fetch: async (request) => {
//     console.log(`Request received: ${request.url}`);
//     const key = request.headers['x-key'];
//     const value = await redis.get(key);
//     return new Response(value, { status: 200 });
//   }
// });

// serve({
//     port: 3000,
//     fetch: async (request) => {
//         console.log(`Request received: ${request.url}`);
//         console.log(`Request headers: ${JSON.stringify(request.headers)}`);
//         const key = request.headers.get('x-key');

//         console.log(`querying redis for key: ${key}`)
//         await redis.set('foo', 'bar');
//         const other = await redis.get('foo');
//         console.log(`other: ${other}`);
//         // const value = await redis.get(key);
//         // get a list from redis
//         const value = await redis.lrange(key, 0, -1);
//         console.log(`value: ${value}`);
//         console.log(`value[0]: ${value[0]}], value[1]: ${value[1]}`)

//         const mylist = ['one', 'two', 'three'];
//         await redis.rpush('mylist', mylist);
//         const mylist2 = await redis.lrange('mylist', 0, -1);
//         console.log(`mylist2: ${mylist2}\n mylist2[0]: ${mylist2[0]}, mylist2[1]: ${mylist2[1]}, mylist2[2]: ${mylist2[2]}`);

//         // dummy promise to try out async/await syntax for bun server.
//         // const x = await dummy();
//         // console.log(x);
//         return new Response(value, { status: 200 });
//     },
//   });

serve({
    port: 3000,
    fetch: async (request: Request) => {
        console.log(`Request received: ${request.url}`);
        console.log(`Request headers: ${JSON.stringify(request.headers)}`);
        // const key = request.headers.get('x-key');

        const method = request.method;
        const url = request.url;
        const indexOfPathStart = url.lastIndexOf('/') + 1;
        const indexOfPathEnd = url.length;
        const path = url.substring(indexOfPathStart, indexOfPathEnd);
        console.log(`path: ${path}, method: ${method}`);
        console.log(`${path === 'initGame'}`);

        switch(method) {
            case 'GET':
                console.log('GET request');
                if (path === 'initGame') {
                    // check if a game exists, if not create a new one. `board` is just
                    // a stringified array of 9 elements, each element is either null or 'X' or 'O'
                    try {
                        console.log('GET /initGame');
                        let board = await redis.get('game');
                        if (!board) {
                            console.log('no game found, creating new game');
                            board = JSON.stringify(new Array(9).fill(null));
                            await redis.set('game', board);
                        }

                        const resp = new Response(board, { status: 200 });
                        console.log(`resp: ${resp}`);
                        return resp;

                    } catch (err) {
                        console.log(err);
                        return new Response(JSON.stringify(err), { status: 500 });
                    }
                } else if (path === 'getGame') {
                    // get the game board
                    const board = await redis.get('game');
                    return new Response(board, { status: 200 });
                }
                break;
            case 'POST':
                // update the game board
                if (path === 'updateGame') {
                    const body = await request.json();
                    console.log(`body: ${body}`);

                    // update the game board.
                    return new Response(null, { status: 200 });
                }
                break;
            default:
                return new Response(JSON.stringify('Method not supported'), { status: 400 });
        }

    }, 
});
  

console.log(`Server listening on port 3000`);