# STUDIJOBS - by Team 4 - ESE2018
This group-project contains the following components:
- [frontend](https://github.com/SilasBerger/ESE-2018-Scaffolding/tree/master/frontend): an Angular application
- [backend](https://github.com/SilasBerger/ESE-2018-Scaffolding/tree/master/backend): a Node.js application written in TypeScript, using the express.js web framework 

## Prerequisites
- You should have [Node.js](https://nodejs.org/en/) and NPM installed (NPM is installed automatically with latest versions of Node.js) which are needed by both [frontend](https://github.com/SilasBerger/ESE-2018-Scaffolding/tree/master/frontend) and [backend](https://github.com/SilasBerger/ESE-2018-Scaffolding/tree/master/backend) projects. You can verify whether you have both by running `node -v` and `npm -v` in terminal or command prompt.
- You should have [Angular CLI](https://cli.angular.io/) globally installed on your machine.
- Either get your WebStorm student license [from here](https://www.jetbrains.com/shop/eform/students) or use IDE of your choice.

## Understanding project structure
- The main project folder contains two subfolders- frontend and backend. These two are projects on their own which you will run independently. 
- The backend folder contains express project that serves as a REST API, exposes endpoints to accept HTTP requests. For received HTTP requests, it in turn returns JSON data.
- The frontend folder contains Angular project, which makes HTTP requests to the backend and processes the JSON data received i.e. make changes if required and display it on the UI.

## Technologies
- [Typescript](https://www.typescriptlang.org/): All Code is written in TypeScript
- [Angular 6](https://angular.io/): The frontend is build with Angular
- [Angular Material](https://material.angular.io/): The design is heavily based on Angular Material
- [Express](https://expressjs.com/): The backend is build with Express
- [SQLite](https://www.sqlite.org/index.html): Database for this project
- [Webstorm](https://www.jetbrains.com/webstorm/) or [Visual Studio Code](https://code.visualstudio.com/) as the IDE

## Browser
Our application should be best used with the [Firefox] Browser.
