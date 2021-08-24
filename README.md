# Zendesk Coding Challenge - Marketplace

## Background

This is a simple cli tool that enables user to search through Zendesk data easily.

## User flow design consideration

As I plan the UI, I realize as a user, I really need to know what the schema look like to be able to search effectively. Therefore, in the user flow, I provided the schema information for user to be able to know how to query, and validation to prevent typo while user try to search for any data.

## Technical design considerations

The design of this tool is assuming the user can replace any of the `xxx.json` data files with other JSON format data files, and it would still work fine.

Therefore, the schema is captured dynamically in the start of the app, by analysing the first data of the json data set. I do it in assumption that the data schema is consistent over the data set though.

The search process is done using streaming facility, to ensure even if we are processing really big files, it uses minimum amount of memory and is performant.

Note that at the moment, the supported data files are coded in a variable called `SUPPORTED_TABLES`. This could potentially be extracted as an environment variable in the future to make any json data set searchable without changing a line of code.

## Test Strategy

I have unit tests to cover most functions, and an integration test to cover the CLI behaviour. Note that although that integration test can be a bit slow, the test suite is still really fast. Therefore I have not bothered split them at this stage.

## Prerequisite

The app is built in ts-node 9, node 14 and npm 6+

My recommendation to install node and npm is to use [NVM (node version manager)](https://github.com/nvm-sh/nvm), 

```
# Install nvm
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash

# Install node 14
nvm install v14.16.0

# Install latest npm
nvm install-latest-npm
```

## Start App

```
# Initialize the app
npm install

# Run the app
npm start
```

The app by default compiles through ts-node for convenience for development. However, raw JS running by nodeJS use much less memory than ts-node, so we also provide facility to compile. This is also done in the docker image
```
npm run compile
node ./dist/runner.js
```

## Run test

```
npm test
```
