const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

const Heroku = require('heroku-client');
//note: This token expires after a year
const token = 'c475269b-6085-4db9-9601-22f79f8ed83a';
const appName = 'protected-chamber-82435';

server.use(middlewares);
server.use(router);
        
server.listen(port);

let reset = false;
const heroku = new Heroku({ token: token });

function resetDynos(){
    if (reset) {
        heroku.delete('/apps/' + appName + '/dynos/')
            .then(() => console.log("dynos reseted"));
    };

    reset = true;
    setTimeout(resetDynos, 300000);
}

resetDynos();
