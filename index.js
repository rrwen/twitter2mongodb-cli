// Richard Wen
// rrwen.dev@gmail.com

var parseMongoUrl = require('parse-mongo-url');
var twitter2mongodb = require('twitter2mongodb');

module.exports = function(argv) {
	
	// (options_file) Load options file
	if (argv.file != undefined) {
		require('dotenv').config({path: argv.file});
	}
	
	// (command_run_options) Default run options
	argv = argv || {};
	argv.twitter = argv.twitter || {};
	argv.twitter.method = argv.twitter.method || process.env.TWITTER_METHOD || 'get';
	argv.twitter.path =argv.twitter.path || process.env.TWITTER_PATH || 'search/tweets';
	argv.twitter.params = argv.twitter.params || process.env.TWITTER_PARAMS || {q:'twitter'};
	argv.mongodb = argv.mongodb || {};
	argv.mongodb.database = argv.mongodb.database || process.env.MONGODB_DATABASE|| 'test';
	argv.mongodb.collection = argv.mongodb.collection || process.env.MONGODB_COLLECTION || 'tweet_data';
	argv.mongodb.connection = argv.mongodb.connection || process.env.MONGODB_CONNECTION || 'mongodb://@localhost:27017';
	
	// (command_run_info) Information JSON
	var quote = '"';
	var delim = ",";
	var parsed = parseMongoUrl(argv.mongodb.connection);
	var info = {
		twitter: {
			method: argv.twitter.method,
			path: argv.twitter.path,
			params: argv.twitter.params
		},
		mongodb: {
			connection: parsed.servers,
			database: argv.mongodb.database,
			collection: argv.mongodb.collection
		}
	};
	header = 'time_iso8601' + delim + 'status' + delim + 'message' + delim + 'json\n'
	info = quote + new Date().toISOString() + quote + delim + quote + 'start' + quote + delim  + quote + 'Options' + quote + delim + quote + JSON.stringify(info).replace(/"/g, '""') + quote;
	console.log(header + info);
	
	// (command_stream) Twitter stream API
	if (argv.twitter.method == 'stream') {
		
		// (command_stream_verbose) Success log messages for streams
		if (argv.verbose) {
			argv.twitter.stream = function(err, data) {
				console.log(quote + new Date().toISOString() + quote + delim + quote + 'success' + quote + delim + delim);
			};
		}
		
		// (command_stream_run) Start streaming process and log errors
		var stream = twitter2mongodb(argv);
		stream.on('error', function(err) {
			console.error(quote + new Date().toISOString() + quote + delim + quote + 'error' + quote + delim + quote + err.message + quote + delim + quote + JSON.stringify(err) + quote + delim);
		});
	} else {
		
		// (command_rest) Twitter REST API
		twitter2mongodb(argv)
			.then(data => {
				if (argv.verbose) {
					console.log(quote + new Date().toISOString() + quote + delim + quote + 'success' + quote + delim + delim);
				}
				data.mongodb.client.close();
				process.exit(0);
			})
			.catch(err => {
				console.error(quote + new Date().toISOString() + quote + delim + quote + 'error' + quote + delim + quote + '' + quote + delim + quote + JSON.stringify(err).replace(/"/g, '""') + quote + delim);
				process.exit(1);
			});
	}
};
