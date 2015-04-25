var Tweet = require('../models/Tweet');

module.exports = function(stream, io) {
	// when we get tweet
	stream.on('data', function(data){

		// construct the object
		var tweet = {
			twid: data['id'],
			active: false,
			author: data['user']['name'],
			avatar: data['user']['profile_image_url'],
			body: data['text'],
			date: data['created_at'],
			screenname: data['user']['screen_name']
		};

		// create a newmodel sinstance with our object
		var tweetEntry = new Tweet(tweet);

		// save to db
		tweetEntry.save(function(error){
			if (!error){
				io.emit('tweet', tweet);
			}
		});
	});
};