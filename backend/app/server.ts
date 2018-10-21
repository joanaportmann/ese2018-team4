// import everything from express and assign it to the express variable
import express from 'express';

// import all the controllers. If you add a new controller, make sure to import it here as well.
import {JobController} from './controllers';
import {Sequelize} from 'sequelize-typescript';
import {Job} from './models/job.model';
import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';

const sequelize =  new Sequelize({
  database: 'development',
  dialect: 'sqlite',
  username: 'root',
  password: '',
  storage: 'db.sqlite'
});
sequelize.addModels([Job]);

// create a new express application instance
const app: express.Application = express();
app.use(express.json());

// init passport (for authentication)
app.use(passport.initialize());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

//app.use(passport.session());

// configure authentication strategy
passport.use(new LocalStrategy((username: string, password: string, done: Function) => {
  if(username === 'test' && password === 'test') return done(null, {name: 'test'});
  return done(null, false, {message: 'authentication failed'});
}));

// define the port the express app will listen on
var port: number = 3000;
if (process.env.PORT !== undefined) {
  port = parseInt(process.env.PORT);
}

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/job', JobController);
app.post('/login', passport.authenticate('local'), (req: express.Request, res: express.Response) => {
    res.statusCode = 200;
    res.send('login successful');
});

sequelize.sync().then(() => {
// start serving the application on the given port
  app.listen(port, () => {
    // success callback, log something to console as soon as the application has started
    console.log(`Listening at http://localhost:${port}/`);
  });
});
