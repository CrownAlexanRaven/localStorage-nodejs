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
There are only 2 things to remember about this library.
1. Synchronous vs Asynchronous Mode

There are two modes available: synchronous and asynchronous.

By default you will have synchronous mode enabled.

CommonJS

Synchronous Mode
```js
const localStorageConstruct = require('localstorage-nodejs');
let localStorage = new localStorageConstruct("foo", false); // Synchronous mode. The false is not required as it defaults to synchronous.
```
Asynchronous Mode
```js
const localStorageConstruct = require('localstorage-nodejs');
let localStorage = new localStorageConstruct("foo", true); // Asynchronous mode. The true arg is required.
```
ECMAScript

Synchronous Mode
```js
const { default: localStorageConstruct } = await import('../index.mjs');
// or you can import with 
import localStorageConstruct from 'localstorage-nodejs';
let localStorage = new localStorageConstruct("foo", false); // Synchronous mode. The false is not required as it defaults to synchronous.
```
Asynchronous Mode
```js
const { default: localStorageConstruct } = await import('../index.mjs');
// or you can import with 
import localStorageConstruct from 'localstorage-nodejs';
let localStorage = new localStorageConstruct("foo", true); // Asynchronous mode. The true arg is required.
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
