const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

server.use(middlewares);
server.use(router);
    
server.listen(port);


function killHeroku() {
    process.exit(0)

    setTimeout(killHeroku, 720000)
}

killHeroku();