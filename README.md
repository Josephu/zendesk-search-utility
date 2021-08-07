# Zendesk Coding Challenge - Marketplace

## Background

This is a simple cli tool that enables user to search through Zendesk data easily.

## Design considerations

The app is build in console mode, with clear usage to help user use it.

The processing is done using streaming facility, to ensure even if we are processing really big files, it uses minimum amount of memory and is performant.

## Prerequisite

The app is built in ts-node 9, node 14 and npm 6

## Start App

Initialize the app
```
npm install
```

Run the app
```
npm start
```

The app by default compiles through ts-node for convenience for development. However, raw JS running by nodeJS use much less memory than ts-node, so we also provide facility to compile. This is also done in the docker image
```
npm run compile
node ./dist/cli.js
```

## Run test

```
npm test
```
