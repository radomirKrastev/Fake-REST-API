const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

const Heroku = require('heroku-client');
const token = 'c475269b-6085-4db9-9601-22f79f8ed83a';
const appName = 'protected-chamber-82435';
// const dynoName = 'yourDynoHere';

server.use(middlewares);
server.use(router);
        
server.listen(port);

let reset = false;
const heroku = new Heroku({ token: token });

function resetDynos(){
    if (reset) {
        console.log(1);
        // heroku.delete('/apps/' + appName + '/dynos/' + dynoName)
        heroku.delete('/apps/' + appName + '/dynos/')
            .then(() => console.log("dynos reseted"));
        console.log(2);
    };

    reset = true;
    console.log(3);
    setTimeout(resetDynos, 120000);
}

resetDynos();
