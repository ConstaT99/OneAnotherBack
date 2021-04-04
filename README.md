# OneAnother Backend Repo

This repository contains the Cloud Functions for OneAnother.

# Tech Stack
We are using Nodejs 14, Here is the link for download https://nodejs.org/dist/v14.16.0/node-v14.16.0.pkg (mac), https://nodejs.org/dist/v14.16.0/node-v14.16.0-x86.msi (windows) 

TypeScript: https://www.typescriptlang.org/

Firebase: https://firebase.google.com/docs


# Before Set Up
For **Mac os**: If you do not have Xcode installed in your computer please go to App store search Xcode and installed it on your computer.

# SetUp
- Install yarn : `npm install --global yarn `
- check yarn install successfully `yarn -v`
- Install All dependencies: `cd functions`, then `yarn install`
- Run `npm install -g firebase-tools`
- Run `firebase login` this will login the account that work with this project
- Run `cd ..` back to upper folder
- Run `firebase init functions`,The answer for question when you run the command:

    - What language would you like to use to write Cloud Functions? **TypeScript**
    - Do you want to use ESLint to catch probable bugs and enforce style? **Yes**
    - File functions/package.json already exists. Overwrite? **No**
    - File functions/index.js already exists. Overwrite? **No**
    - File functions/.gitignore already exists. Overwrite? **No**
    - Do you want to install dependencies with npm now? **No**

- Run `yarn test` this command will allow you to build and test with mocha, for all function
- Run`firebase use test` it will lead you to the test database(it not working then change test to default, which means test database not setup)
- Run `yarn deploy`, it will build and deploy all functions to test database
- Go to URL https://us-central1-oneanother-757c7.cloudfunctions.net/helloWorld, If you see `Hello from OneAnother!` Then Set Up is finished. (This step may take few minutes)

# Some Explanation
- `index.ts` is the entry point for each function.
- `./functions/func/` file contain all Cloud function. Please Test it before you deploy.
- `./functions/test/` file contain all test function.(need work)


`yarn add chai mocha ts-node @types/chai @types/mocha --save-dev`// install test module

# ToDo List
- need find a way to auto export function and load all function
- test setup on other machine.
- Finished template function.
- set up test database.
- need set up comment layout in template function.
