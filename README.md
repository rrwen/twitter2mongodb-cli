# twitter2mongodb-cli

Richard Wen  
rrwen.dev@gmail.com  

Command line tool for extracting Twitter data to MongoDB databases

[![npm version](https://badge.fury.io/js/twitter2mongodb-cli.svg)](https://badge.fury.io/js/twitter2mongodb-cli)
[![Build Status](https://travis-ci.org/rrwen/twitter2mongodb-cli.svg?branch=master)](https://travis-ci.org/rrwen/twitter2mongodb-cli)
[![npm](https://img.shields.io/npm/dt/twitter2mongodb-cli.svg)](https://www.npmjs.com/package/twitter2mongodb-cli)
[![GitHub license](https://img.shields.io/github/license/rrwen/twitter2mongodb-cli.svg)](https://github.com/rrwen/twitter2mongodb-cli/blob/master/LICENSE)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/rrwen/twitter2mongodb-cli.svg?style=social)](https://twitter.com/intent/tweet?text=Command%20line%20tool%20for%20extracting%20Twitter%20data%20to%20MongoDB%20databases:%20https%3A%2F%2Fgithub.com%2Frrwen%2Ftwitter2mongodb-cli%20%23nodejs%20%23npm)

## Install

1. Install [Node.js](https://nodejs.org/en/)
2. Install [twitter2mongodb-cli](https://www.npmjs.com/package/twitter2mongodb-cli) via `npm`

```
npm install -g twitter2mongodb-cli
```

For the latest developer version, see [Developer Install](#developer-install).

## Usage

Get help:

```
twitter2mongodb --help
```

Open documentation in web browser:

```
twitter2mongodb doc twitter2mongodb
twitter2mongodb doc twitter
twitter2mongodb doc mongodb
```

See [twitter2mongodb](https://www.npmjs.com/package/twitter2mongodb) for programmatic usage.

### Environment File

Create a template `.env` file for Twitter and MongoDB details:

* Edit this file with your [Twitter API credentials](https://apps.twitter.com/) and [MongoDB details](https://docs.mongodb.com/manual/reference/connection-string/)

```
twitter2mongodb file path/to/.env
```

Set default for the `.env` file:

* Every `twitter2mongodb` command will now use the designated `.env` file

```
twitter2mongodb set file path/to/.env
```

### MongoDB Query

Send a query to a MongoDB database after defining and setting the default [Environment File](#environment-file).  
  
An example of a `find` query for all documents:

```
twitter2mongodb query find {}
```

### REST API

Setup default twitter options:

1. Set Twitter REST method (one of `get`, `post`, `delete` or `stream`)
2. Set [Twitter path](https://developer.twitter.com/en/docs/api-reference-index)
3. Set Twitter parameters for path

```
twitter2mongodb set twitter.method get
twitter2mongodb set twitter.path search/tweets
twitter2mongodb set twitter.params "{\"q\":\"twitter\"}"
```

Setup default MongoDB options:

1. Set database to store streamed Twitter data
2. Set collection to store streamed Twitter data
3. Set MongoDB [query method](https://mongodb.github.io/node-mongodb-native/3.0/api/Collection) for streamed Twitter data
4. Set [jsonata](https://www.npmjs.com/package/jsonata) filter before inserting

```
twitter2mongodb set mongodb.database twitter2mongodb_database
twitter2mongodb set mongodb.collection twitter_data
twitter2mongodb set mongodb.method insertMany
twitter2mongodb set jsonata statuses
```

Extract Twitter data into MongoDB collection given setup options:

```
twitter2mongodb > log.csv
```

### Stream API

Setup default twitter options:

1. Set Twitter stream method
2. Set Twitter path
3. Set [Twitter stream parameters](https://developer.twitter.com/en/docs/tweets/filter-realtime/api-reference/post-statuses-filter.html)

```
twitter2mongodb set twitter.method stream
twitter2mongodb set twitter.path statuses/filter
twitter2mongodb set twitter.params "{\"track\":\"twitter\"}"
```

Setup default MongoDB options:

1. Set database to store streamed Twitter data
2. Set collection to store streamed Twitter data
3. Set MongoDB [query method](https://mongodb.github.io/node-mongodb-native/3.0/api/Collection) for streamed Twitter data

```
twitter2mongodb set mongodb.database twitter2mongodb_database
twitter2mongodb set mongodb.collection twitter_data
twitter2mongodb set mongodb.method insertOne
```

Stream Twitter data into MongoDB collection given setup options:

```
twitter2mongodb > log.csv
```

Stream Twitter data into a MongoDB collection as a service:

1. Save a [node](https://nodejs.org/api/cli.html) runnable script of the current options
2. Install [pm2](https://www.npmjs.com/package/pm2) (`npm install pm2 -g`)
2. Use `pm2`  to run the saved script as a service

```
twitter2mongodb save path/to/script.js
pm2 start path/to/script.js
pm2 save
```

## Contributions

### Report Contributions

Reports for issues and suggestions can be made using the [issue submission](https://github.com/rrwen/twitter2mongodb-cli/issues) interface.

When possible, ensure that your submission is:

* **Descriptive**: has informative title, explanations, and screenshots
* **Specific**: has details of environment (such as operating system and hardware) and software used
* **Reproducible**: has steps, code, and examples to reproduce the issue

### Code Contributions

Code contributions are submitted via [pull requests](https://help.github.com/articles/about-pull-requests/):

1. Ensure that you pass the [Tests](#tests)
2. Create a new [pull request](https://github.com/rrwen/twitter2mongodb-cli/pulls)
3. Provide an explanation of the changes

A template of the code contribution explanation is provided below:

```
## Purpose

The purpose can mention goals that include fixes to bugs, addition of features, and other improvements, etc.

## Description

The description is a short summary of the changes made such as improved speeds or features, and implementation details.

## Changes

The changes are a list of general edits made to the files and their respective components.
* `file_path1`:
	* `function_module_etc`: changed loop to map
	* `function_module_etc`: changed variable value
* `file_path2`:
	* `function_module_etc`: changed loop to map
	* `function_module_etc`: changed variable value

## Notes

The notes provide any additional text that do not fit into the above sections.
```

For more information, see [Developer Install](#developer-install) and [Implementation](#implementation).

## Developer Notes

### Developer Install

Install the latest developer version with `npm` from github:

```
npm install git+https://github.com/rrwen/twitter2mongodb-cli
```
  
Install from `git` cloned source:

1. Ensure [git](https://git-scm.com/) is installed
2. Clone into current path
3. Install via `npm`

```
git clone https://github.com/rrwen/twitter2mongodb-cli
cd twitter2mongodb-cli
npm install
```

### Tests

1. Clone into current path `git clone https://github.com/rrwen/twitter2mongodb-cli`
2. Enter into folder `cd twitter2mongodb-cli`
3. Ensure [devDependencies](https://docs.npmjs.com/files/package.json#devdependencies) are installed and available
4. Run tests
5. Results are saved to [tests/log](tests/log) with each file corresponding to a version tested

```
npm install
npm test
```

### Documentation

Use [documentationjs](https://www.npmjs.com/package/documentation) to generate html documentation in the `docs` folder:

```
npm run docs
```

See [JSDoc style](http://usejsdoc.org/) for formatting syntax.

### Upload to Github

1. Ensure [git](https://git-scm.com/) is installed
2. Inside the `twitter2mongodb-cli` folder, add all files and commit changes
3. Push to github

```
git add .
git commit -a -m "Generic update"
git push
```

### Upload to npm

1. Update the version in `package.json`
2. Run tests and check for OK status
3. Generate documentation
4. Login to npm
5. Publish to npm

```
npm test
npm run docs
npm login
npm publish
```

### Implementation

The module [twitter2mongodb-cli](https://www.npmjs.com/package/twitter2mongodb-cli) uses the following [npm](https://www.npmjs.com/) packages for its implementation:

npm | Purpose
--- | ---
[yargs](https://www.npmjs.com/package/yargs) | Command line builder and parser
[twitter2mongodb](https://www.npmjs.com/package/twitter2mongodb) | Extracts Twitter data to MongoDB
[dotenv](https://www.npmjs.com/package/dotenv) | Load environmental variables from a file
[opn](https://www.npmjs.com/package/opn) | Open online browser documentation
[mongodb](https://www.npmjs.com/package/mongodb) | Send queries to MongoDB database
[parse-mongo-url](https://www.npmjs.com/package/parse-mongo-url) | Parse MongoDB urls

```
yargs
   |--- twitter2mongodb   <-- default command
   |--- dotenv            <-- file
   |--- opn               <-- doc
   |--- mongodb           <-- query
   |--- parse-mongo-url   <-- parse MongoDB url for info
```
