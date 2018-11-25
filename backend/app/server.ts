// import everything from express and assign it to the express variable
import express from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Sequelize } from 'sequelize-typescript';
// import all the controllers. If you add a new controller, make sure to import it here as well.
import { JobController } from './controllers';
import { UserController } from './controllers/user.controller';
import { Job } from './models/job.model';
import { User } from './models/user.model';
let session = require("express-session"),
bodyParser = require("body-parser");


const sequelize =  new Sequelize({
  database: 'development',
  dialect: 'sqlite',
  username: 'root',
  password: '',
  storage: 'db.sqlite'
});
sequelize.addModels([Job, User]);

// create a new express application instance
const app: express.Application = express();
app.use(express.json());
app.use(bodyParser.text());

app.use(session({secret: "cats"}));
app.use(bodyParser.urlencoded({ extended: false }));

// init passport (for authentication)
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});


// configure authentication strategy
passport.use(new LocalStrategy(async (username: string, password: string, done: Function) => {
  const user: User | null = await User.findByPrimary(username);
  if (!user) return done(null, false, {message: 'no user found'});

  if (User.hashPassword(password).toLowerCase() !== user.passwordHash.toLowerCase())
    return done(null, false, {message: 'wrong password'});

  return done(null, user);
}));

// define the port the express app will listen on
var port: number = 3000;
if (process.env.PORT !== undefined) {
  port = parseInt(process.env.PORT);
}

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  // cannot use wildcard, because not (properly) supported by browsers yet
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/job', JobController);
app.use('/user', UserController);
app.post('/login', passport.authenticate('local'), (req: express.Request, res: express.Response) => {
    // TODO: exclude pw hash from user cookie
    res.cookie('user', req.user);
    res.statusCode = 200;
    res.send('login successful');
});

app.post('/logout', (req: express.Request, res: express.Response) => {
 
  req.logout();
  res.clearCookie('user');
  res.statusCode = 200;
  res.send('logout successful');
});


sequelize.sync().then(() => {
// start serving the application on the given port
  app.listen(port, () => {
    // success callback, log something to console as soon as the application has started
    console.log(`Listening at http://localhost:${port}/`);
  });
});
