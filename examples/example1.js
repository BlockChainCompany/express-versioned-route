const app = require('express')();
const VersionedRoute = require('../index');

app.listen(3000);

app.get('/', new VersionedRoute()
  .add("1.0.0", respondV1)
  .add("2.0.0", respondV2)
  .add("2.5.0", respondV3)
  .add("3.0.0", respondV4)
  .toMiddleware()
);


//curl -s -H 'accept-version: 1.0.0' localhost:3000/test
// version 1.0.0 or 1.0 or 1 !
function respondV1(req, res, next) {
   res.status(200).send('ok v1');
}

//curl -s -H 'accept-version: 2.2.0' localhost:3000/test
//Anything from 2.2.0 to 2.2.9
function respondV2(req, res, next) {
   res.status(200).send('ok v2');
}

//curl -s -H 'accept-version: 2.5.0' localhost:3000/test
//curl -s -H 'accept-version: 3.0.0' localhost:3000/test
// If client version doesn't match any provided server versions (eg: 3.0.0), then latest
 // version callback is called by default (if NoMatchFoundCallback is not found)
function respondV3(req, res, next) {
    res.status(200).send('ok v3');
}

function respondV4(req, res, next) {
    res.status(200).send('ok v4');
}
