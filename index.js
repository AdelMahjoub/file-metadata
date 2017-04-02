const express = require('express');
const path = require('path');
const routes = require('./routes/routes');

const app = express();

app.disable('x-powered-by');

if(app.get("env") === "production") {
  app.enable("trust-proxy");
  app.use(helmet.xssFilter());
  app.use(helmet.noSniff());
  app.use(helmet.frameguard({
    action: "deny"
  }));
}

app.set('port', process.env.PORT || 3000);
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(routes);

app.listen(app.get('port'), function() {
  console.log(`Server running on port ${app.get('port')}`);
});

