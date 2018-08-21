const tmi = require('tmi.js');
const Realm = require('realm');

let CommandSchema = {
	name: 'commands',
	primaryKey: 'command', //기본키
	properties: {
		command: 'string',
		explain: 'string'
	}
};

var commandRealm = new Realm({
	path: 'Commands.realm',
	schema: [CommandSchema]
});

var mychannel = '#yce5074'

var options = { 
	options: {
		debug: true
	},
	
	connection: {
		cluster:"aws",
		reconnect: true
	},
	identity: {
		username: "RnNeBot",
		password: "oauth:pnb774p2otm9v2rl3zp7pk1ika4i4w"
	},
	channels: [mychannel]
};

var client = new tmi.client(options);
client.connect();

client.on('connected', function(address, port){
	console.log("Address: " + address + " Port : " + port);
});

client.on('chat', (channel, user, message, self) => {
	//자기메시지에는 반응하지않음
	if(self) return;
	
	let sender = user['display-name'];
	let posts = commandRealm.objects('commands');
	
	//싹둑이와 나이트봇에는 반응하지않음
	if(sender == '싹둑' || sender == 'nightbot');
	else{
		if(channel == mychannel){
				if(user.badges.broadcaster || user.mod){
					if(message === "!명령어"){
						var commands = "";
						for(var i=0; i<posts.length; i++)
							commands += posts[i].command + " ";
						client.say(mychannel, "스트리머전용기능 '!명령어추가 명령어 내용' / 유저 명령어 : " + commands);
					}
					
					if(message.includes("!명령어추가")){
						var i;
						var messageSplit = message.split(' ');
						for(i = 0; i<messageSplit.length; i++){
							console.log(messageSplit[i]);
							if((messageSplit[i] === "!명령어추가" &&
								messageSplit[i+1] === "!명령어추가") ||
								(messageSplit[i] === "!명령어추가" &&
								!messageSplit[i+1]) ||
								(messageSplit[i] === "!명령어추가" &&
								!messageSplit[i+2])){
									client.say(mychannel, "잘못된 입력입니다.");
									break;
							}
							else {
								var command = messageSplit[i+1];
								var explain = "";
								
								for(var j=i+2; j<messageSplit.length; j++){
									explain += messageSplit[j] + " ";
								}
								
								console.log(command + " " + explain);
								commandRealm.write(() => {
									commandRealm.create('commands', {command: command, explain: explain}, true);
								});
								//client.say(mychannel, "명령어 : '" + command + "' 내용 : '" + explain + "'이(가) 추가되었습니다.");
								break;
							}
						}
					}
					
					if(message.includes("!명령어삭제")){
						var i;
						var messageSplit = message.split(' ');
						for(i = 0; i<messageSplit.length; i++){
							if((messageSplit[i] === "!명령어삭제" &&
								messageSplit[i+1] === "!명령어삭제") ||
								(messageSplit[i] === "!명령어삭제" &&
								!messageSplit[i+1])){
									client.say(mychannel, "잘못된 명령입니다.");
									break;
							}
							else{
								for(var j=0; j<posts.length; j++){
									if(posts[j].command == messageSplit[i+1]){
										commandRealm.write(() => {
											let command = commandRealm.objects('commands');
											console.log(command);
											commandRealm.delete(command[j]);
											client.say(mychannel, messageSplit[i+1] + " 명령어가 삭제되었습니다.");
										});
										break;
									}
								}
							}
						}
					}	
				}
				
				else{
					if(message.includes("!명령어")){
						var commands = "";
						for(var i=0; i<posts.length; i++)
							commands += posts[i].command + " ";
						client.say(mychannel, "현재 명령어 : " + commands);
					}
					
					if(message.includes("른하")){
						client.say(mychannel, "안녕하세요 " + user['display-name'] + "님");
					}
				}
				
				for(var i=0; i<posts.length; i++){
					if(message === posts[i].command){
						client.say(mychannel, posts[i].explain);
						break;
					}
				}
			}
		}
});