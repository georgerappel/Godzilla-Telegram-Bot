var debug = true;
var quietList = '';

var Bot = require('node-telegram-bot');
var bot;
var testAnswer;

function start() {
	bot= new Bot({
		token: process.env.TELEGRAM_TOKEN
	  })
	  .enableAnalytics(process.env.TELEGRAM_ANALYTICS)
	  .on('message', handleMessage)
	  .on('error', function (message) {
		  console.error('It seems like we lost the connection...');
		  throw new Error('Telegram error:', message);
	  })
	  .start();
	if(process.env.TEST){
		testAnswer = "";
		handleMessage("/god");
		handleMessage("/isdhisdd"); // Random command to test if it will get stuck
		handleMessage("asnd /god");
		process.exit();
	}
}

function handleMessage(message) {
	console.log(message);
	if (message && message.text && /^\/[a-z]+/.test(message.text)) {
		var parsed = /^\/([a-z]+)\s?(.*)/.exec(message.text);
		if (!parsed) { return; }
		var command = parsed[1];
		var param = parsed[2];
		try {
			if (debug) {
				console.log('received /' + command + ' ' + param);
			}
			var cmd = require('./commands/' + command.toLowerCase());
			if ((typeof cmd !== 'function') && cmd.telegram) {
				if(debug){ console.log('not a function'); }
				cmd = cmd.telegram;
			}
			var answer = cmd(message.from, message.chat, param ? param.trim() : '', bot);
			if (answer && quietList.indexOf(message.chat.id) === -1) {
				bot.sendMessage({
					chat_id: message.chat.id,
			        text: answer,
			        reply_to_message_id: message.message_id,
			        disable_web_page_preview: true
				}, function (err, msg) {
					if (debug) { console.log('executed /' + command); }
					if(err) { console.log(err); }
				});
			}
		} catch (e) {
			if (debug) {
				console.log(e);
			}
		}
	} else if (message && message.text && (message.text.toLowerCase().indexOf("@nanozilla_bot") || message.text.toLowerCase().indexOf("godzilla")) ){
		console.log("Fui citado");

	}
}

function sendMessage(destination, text) {
	console.log('sending message to ', destination);
	bot.sendMessage({
		chat_id: destination,
        text: text,
        disable_web_page_preview: true
	});
}

// Export the functions for global public acess
module.exports = {
	start: start,
	bot: bot,
	sendMessage: sendMessage	
};
