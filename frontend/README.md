# Front-End Scaffolding

## Initial Setup
1. Install [Node.js](https://nodejs.org/en/) (must be done already, as it is a part of prerequisite!)
1. `cd` into this frontend folder with your terminal or command prompt
1. Run `npm install` which will install all the required dependencies
1. When successful, run `ng serve --open` - this will open the application in your default web browser.
   This only works if you have Angular CLI globally installed. If not, run `npm run ng serve --open`.
1. Alternatively, you can run just `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
1. This project uses [Angular Material](https://material.angular.io/) for styling. It is enabled for you by by us by ruuning `ng add @angular/material`. 

This project is generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8. Refere their website for commands to generate components, services, pipes easily.


## Further development 

- Run `ng generate component component-name` to generate a new component. 
- You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module` to generate other artefact.


## A quick introduction to components, services, templates in Angular
[Link a ppt]()

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build. This `dist` folder is used to put on production server.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
