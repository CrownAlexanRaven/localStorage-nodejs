# localStorage-nodejs
A simple implementation of the Web API, localStorage.

# Installation

```zsh
# npm installation
npm install localStorage-nodejs
# yarn installation
yarn add localStorage-nodejs
# pnpm installation
pnpm addlocalStorage-nodejs
# Directly from GitHub
# npm
npm install https://github.com/CrownAlexanRaven/localStorage-nodejs.git
# yarn installation
yarn add https://github.com/CrownAlexanRaven/localStorage-nodejs.git
# pnpm installation
pnpm add https://github.com/CrownAlexanRaven/localStorage-nodejs.git
```

# Usage
There are only 3 things to remember about this library.
1. Creating the localStorage Object
You can create the localStorage object in either synchronous or asynchronous mode.

ECMAScript (ESM)
```js
const { localStorageSync } = await import('localStorage-nodejs');
let localStorage = new localStorageSync('yourDatabaseNameHere');
```
Common.js
```js
const { localStorageSync } = require('localstorage-nodejs');
let localStorage = new localStorageSync('yourDatabaseNameHere');
```
2. Synchronous vs Asynchronous Mode

There are two modes available: synchronous and asynchronous.
Synchronous Mode
```js
const { localStorageSync } = require('localstorage-nodejs');
let localStorage = new localStorageSync("foo"); // Synchronous mode
```
Asynchronous Mode
```js
const { localStorageAsync } = require('localstorage-nodejs');
let localStorage = new localStorageSync("foo"); // Asynchronous mode
```
The library uses a directory named based on the script’s choice, and the database name is the argument given to the constructor.
The database name must be a string. 
Each key is stored as its own file, with the file name as the key name and the contents as the key value. 
Everything is stored as a string.

To delete the database entirely, you can remove the directory using:
```zsh
rm -rf yourDatabaseNameHere
```
> [!NOTE]
> Each key is stored as its own file, and the contents are stored as strings.
> If you want to store objects or something, you'll have to parse it yourself.
