// Richard Wen
// rrwen.dev@gmail.com

// (packages) Package dependencies
var fs = require('fs');
var moment = require('moment');
var MongoClient = require('mongodb').MongoClient;
var test = require('tape');

const {spawn} = require('child_process');
require('dotenv').config();

// (test_info) Get package metadata
var json = JSON.parse(fs.readFileSync('package.json', 'utf8'));
var testedPackages = [];
for (var k in json.dependencies) {
  testedPackages.push(k + ' (' + json.dependencies[k] + ')');
}
var devPackages = [];
for (var k in json.devDependencies) {
  devPackages.push(k + ' (' + json.devDependencies[k] + ')');
}

// (test_log) Pipe tests to file and output
if (!fs.existsSync('./tests/log')){
    fs.mkdirSync('./tests/log');
}
if (!fs.existsSync('./tests/out')){
    fs.mkdirSync('./tests/out');
}
var testFile = './tests/log/test_' + json.version.split('.').join('_') + '.txt';
test.createStream().pipe(fs.createWriteStream(testFile));
test.createStream().pipe(process.stdout);

// (test) Run tests
test('Tests for ' + json.name + ' (' + json.version + ')', t => {
    t.comment('Node.js (' + process.version + ')');
    t.comment('Description: ' + json.description);
    t.comment('Date: ' + moment().format('YYYY-MM-DD hh:mm:ss'));
    t.comment('Dependencies: ' + testedPackages.join(', '));
    t.comment('Developer: ' + devPackages.join(', '));
	
	// (test_twitter2mongodb_get) Test twitter2mongodb GET
	var child = spawn('node', ['./bin/twitter2mongodb', '--env', '../.env', '--mongodb.database', process.env.MONGODB_TESTDATABASE]);
	child.stderr.on('data', data => {
		t.fail('(MAIN) twitter2mongodb GET: ' + data.toString('utf8'));
	});
	child.on('close', code => {
		t.equals(code, 0, '(MAIN) twitter2mongodb GET');
		
		// (test_twitter2mongodb_stream) Test twitter2mongodb STREAM
		var child = spawn('node', ['./bin/twitter2mongodb', '--twitter.method stream', '--twitter.path statuses/filter', '--twitter.params "{\"track\": \"twitter\"}"', '--env', '../.env', '--mongodb.database', process.env.MONGODB_TESTDATABASE]);
		child.stderr.on('data', data => {
			t.fail('(MAIN) twitter2mongodb STREAM: ' + data.toString('utf8'));
		});
		child.stdout.on('data', data => {
			t.pass('(MAIN) twitter2mongodb STREAM');
			
			// (test_db_drop) Drop test database
			MongoClient.connect(process.env.MONGODB_CONNECTION, function(err, client) {
				if (err) {
					t.fail('(MAIN) drop database: ' + err.message);
					process.exit(1);
				}
				var db = client.db(process.env.MONGODB_TESTDATABASE);
				db.dropDatabase(function(err, result) {
					if (err) {
						t.fail('(MAIN) drop database: ' + err.message);
						process.exit(1);
					}
					t.pass('(MAIN) drop database');
					client.close();
					process.exit(0);
				});
			});
		});
	});
	t.end();
});
