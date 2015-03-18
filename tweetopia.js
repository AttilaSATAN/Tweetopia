var port = process.env.PORT || 3000;

var express = require("express");
var app = express();
//app.use(express.logger());
app.use(express.static(__dirname + '/public'));


// Twitter

var Twitter = require('mtwitter');
var twitter = new Twitter({
	consumer_key: process.env.TWITTER_CONSUMER_KEY || "burası consumer key" ,
	consumer_secret: process.env.TWITTER_CONSUMER_SECRET || "secret'ı buraya yaz",
	application_only: true
});


//

app.get('/ws', function(request, response) {

	var options = JSON.parse(JSON.stringify(request.query));

	if (options.q == null) {
		options.q = '%23MeHow'; // buraya standart hashtagi yaz mesela %23Tangun gibi
	}

	options.callback = null;

	twitter.get(
		'search/tweets',
		options, 
		function(err, item) {
			if(err)
				return console.log("ERROR: " + err)
			//console.log(item);

			if (item != null) {
				//console.log("cool");

				 var json = JSON.stringify(item);
				// response.writeHead(200, {'content-type':'application/json'}); 
				response.jsonp(item);	
			}
		}
	);

});


app.listen(port, function() {
	console.log("Listening on " + port);
});
