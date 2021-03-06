# twitter2mongodb-cli

Richard Wen  
rrwen.dev@gmail.com  

Command line tool for extracting Twitter data to MongoDB databases

[![npm version](https://badge.fury.io/js/twitter2mongodb-cli.svg)](https://badge.fury.io/js/twitter2mongodb-cli)
[![Build Status](https://travis-ci.org/rrwen/twitter2mongodb-cli.svg?branch=master)](https://travis-ci.org/rrwen/twitter2mongodb-cli)
[![npm](https://img.shields.io/npm/dt/twitter2mongodb-cli.svg)](https://www.npmjs.com/package/twitter2mongodb-cli)
[![GitHub license](https://img.shields.io/github/license/rrwen/twitter2mongodb-cli.svg)](https://github.com/rrwen/twitter2mongodb-cli/blob/master/LICENSE)
[![Donarbox Donate](https://img.shields.io/badge/donate-Donarbox-yellow.svg)](https://donorbox.org/rrwen)
[![PayPal Donate](https://img.shields.io/badge/donate-PayPal-yellow.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=NQNSAHK5X46D2)
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

An environment file `.env` is used to store [Twitter API credentials](https://apps.twitter.com/) and [MongoDB details](https://docs.mongodb.com/manual/reference/connection-string/).  
  
**Step 1.** Set the default config for the `.env` file:

* Every `twitter2mongodb` command will now use the designated `.env` file

```
twitter2mongodb config set env path/to/.env
```

**Step 2.** Set [Twitter API credentials](https://apps.twitter.com/)

```
twitter2mongodb env set TWITTER_CONSUMER_KEY ***
twitter2mongodb env set TWITTER_CONSUMER_SECRET ***
twitter2mongodb env set TWITTER_ACCESS_TOKEN_KEY ***
twitter2mongodb env set TWITTER_ACCESS_TOKEN_SECRET ***
```

**Step 3.** Set [MongoDB connection](https://docs.mongodb.com/manual/reference/connection-string/)

```
twitter2mongodb env set MONGODB_CONNECTION mongodb://localhost:27017
```

### REST API

The REST API obtains Twitter data in batches using search queries.  
  
**Step 1.** Setup default twitter options:

1. Set Twitter REST method (one of `get`, `post`, `delete` or `stream`)
2. Set [Twitter path](https://developer.twitter.com/en/docs/api-reference-index)
3. Set Twitter parameters for path

```
twitter2mongodb config set twitter.method get
twitter2mongodb config set twitter.path search/tweets
twitter2mongodb config set twitter.params "{\"q\":\"twitter\"}"
```

**Step 2.** Setup default MongoDB options:

1. Set database to store streamed Twitter data
2. Set collection to store streamed Twitter data
3. Set MongoDB [query method](https://mongodb.github.io/node-mongodb-native/3.0/api/Collection) for streamed Twitter data
4. Set [jsonata](https://www.npmjs.com/package/jsonata) filter before inserting

```
twitter2mongodb config set mongodb.database twitter2mongodb_database
twitter2mongodb config set mongodb.collection twitter_data
twitter2mongodb config set mongodb.method insertMany
twitter2mongodb config set jsonata statuses
```

**Step 3.** Extract Twitter data into MongoDB collection given setup options:

```
twitter2mongodb > log.csv
```

### Stream API

The Stream API obtains Twitter data in real-time using tracking filters.
  
**Step 1.** Setup default twitter options:

1. Set Twitter stream method
2. Set Twitter path
3. Set [Twitter stream parameters](https://developer.twitter.com/en/docs/tweets/filter-realtime/api-reference/post-statuses-filter.html)

```
twitter2mongodb config set twitter.method stream
twitter2mongodb config set twitter.path statuses/filter
twitter2mongodb config set twitter.params "{\"track\":\"twitter\"}"
```

**Step 2.** Setup default MongoDB options:

1. Set database to store streamed Twitter data
2. Set collection to store streamed Twitter data
3. Set MongoDB [query method](https://mongodb.github.io/node-mongodb-native/3.0/api/Collection) for streamed Twitter data

```
twitter2mongodb config set mongodb.database twitter2mongodb_database
twitter2mongodb config set mongodb.collection twitter_data
twitter2mongodb config set mongodb.method insertOne
```

**Step 3a.** Stream Twitter data into MongoDB collection given setup options:

```
twitter2mongodb > log.csv
```

**Step 3b.** Stream Twitter data into a MongoDB collection as a service:

1. Save a [node](https://nodejs.org/api/cli.html) runnable script of the current options
2. Install [pm2](https://www.npmjs.com/package/pm2) (`npm install pm2 -g`)
2. Use `pm2`  to run the saved script as a service

```
twitter2mongodb save path/to/script.js
pm2 start path/to/script.js
pm2 save
```

### Logs

The logs are in the following Comma-Separated Values (CSV) format:

* `time_iso8601`: Time and date in [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format
* `status`: Status of the log
* `message`: Relevant messages
* `json`: [JSON](https://www.json.org/) object containing relevant debugging information

time_iso8601 | status | message | json
--- | --- | --- | ---
... | ... | ... | ...

## Contributions

1. Reports for issues and suggestions can be made using the [issue submission](https://github.com/rrwen/twitter2mongodb-cli/issues) interface.
2. Code contributions are submitted via [pull requests](https://github.com/rrwen/twitter2mongodb-cli/pulls)

See [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

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
4. Run tests with a `.env` file (see [tests/README.md](tests/README.md))
5. Results are saved to [tests/log](tests/log) with each file corresponding to a version tested

```
npm install
npm test
```

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
3. Login to npm
4. Publish to npm

```
npm test
npm login
npm publish
```

### Implementation

The module [twitter2mongodb-cli](https://www.npmjs.com/package/twitter2mongodb-cli) uses the following [npm](https://www.npmjs.com/) packages for its implementation:

npm | Purpose
--- | ---
[path](https://nodejs.org/api/path.html) | Handle file and directory paths
[fs](https://nodejs.org/api/fs.html) | Read and write config file
[envfile](https://www.npmjs.com/package/envfile) | Parse and write env files
[dotenv](https://www.npmjs.com/package/dotenv) | Load environmental variables from a file
[yargs](https://www.npmjs.com/package/yargs) | Command line builder and parser
[yargs-command-config](https://www.npmjs.com/package/yargs-command-config) | Command for managing config files
[yargs-command-env](https://www.npmjs.com/package/yargs-command-env) | Command for managing env files
[twitter2mongodb](https://www.npmjs.com/package/twitter2mongodb) | Extracts Twitter data to MongoDB
[opn](https://www.npmjs.com/package/opn) | Open online browser documentation
[mongodb](https://www.npmjs.com/package/mongodb) | Send queries to MongoDB database
[parse-mongo-url](https://www.npmjs.com/package/parse-mongo-url) | Parse MongoDB urls

```
  path     <-- Handle file and dir paths
   |
   fs      <-- Read and write config file
   |
 envfile   <-- parse and write env file
   |
 dotenv    <-- load env file
   |
 yargs
   |--- yargs-command-config   <-- manage config
   |--- yargs-command-env      <-- manage env
   |--- twitter2mongodb        <-- default command
   |--- opn                    <-- doc
   |--- mongodb                <-- query
   |--- parse-mongo-url        <-- parse MongoDB url for info
```
