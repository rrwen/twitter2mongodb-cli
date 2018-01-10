# twitter2mongodb-cli

Richard Wen  
rrwen.dev@gmail.com  

Command line tool for extracting Twitter data to MongoDB databases

[![npm version](https://badge.fury.io/js/twitter2mongodb-cli.svg)](https://badge.fury.io/js/twitter2mongodb-cli)
[![Build Status](https://travis-ci.org/rrwen/twitter2mongodb-cli.svg?branch=master)](https://travis-ci.org/rrwen/twitter2mongodb-cli)
[![npm](https://img.shields.io/npm/dt/twitter2mongodb-cli.svg)](https://www.npmjs.com/package/twitter2mongodb-cli)
[![GitHub license](https://img.shields.io/github/license/rrwen/twitter2mongodb-cli.svg)](https://github.com/rrwen/twitter2mongodb-cli/blob/master/LICENSE)
[![Donate](https://img.shields.io/badge/donate-Donarbox-yellow.svg)](https://donorbox.org/rrwen)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/rrwen/twitter2mongodb-cli.svg?style=social)](https://twitter.com/intent/tweet?text=Command%20line%20tool%20for%20extracting%20Twitter%20data%20to%20MongoDB%20databases:%20https%3A%2F%2Fgithub.com%2Frrwen%2Ftwitter2mongodb-cli%20%23nodejs%20%23npm)

## Test Environment

The test environment creates an isolated MongoDB database named `twitter2mongodbcli_database` to run tests on.

To connect to Twitter and MongoDB, a `.env` file is required:

1. Create a `.env` file in the root directory
2. Use the template below to provide Twitter credentials and MongoDB connection details inside the `.env` file
3. Ensure that `twitter2mongodbcli_database` does not exist (otherwise it will be dropped after tests)

```
TWITTER_CONSUMER_KEY=***
TWITTER_CONSUMER_SECRET=***
TWITTER_ACCESS_TOKEN_KEY=***
TWITTER_ACCESS_TOKEN_SECRET=***
MONGODB_CONNECTION=mongodb://localhost:27017
MONGODB_TESTDATABASE=twitter2mongodbcli_database
MONGODB_COLLECTION=twitter_data
```

The [Tests](../README.md#tests) can then be run with the following command:

```
npm test
```