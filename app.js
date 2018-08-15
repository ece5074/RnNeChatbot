const tmi = require('tmi.js');

/* json파일 읽고쓰기 기본코드
var file = __dirname + '/test.json';

 var fs = require('fs');

var object = { "명령어" : "명령어가 없습니다."};
var stringJson = JSON.stringify(object) + '\n';
fs.open('test.json','a',"666",function(err,id){
        if(err)
        {
                console.log("file open err!!");
        }
        else
        {
                fs.write(id,stringJson,null,'utf8',function(err)
                {
                        console.log('file was saved!');
                });
        }
});

fs.readFile(file,'utf8',function(err,data){
        if(err){
                console.log('file read error');
        }

        console.log('origin data =>'+ data);
        var strArray = data.split('\n');
        var arrayNum = strArray.length;

        if(strArray.length >0 ) arrayNum = strArray.length - 1;

        console.log('Line Num : ' + arrayNum);

        for(var i=0;i<arrayNum; i++)
        {
           var one = JSON.parse(strArray[i]);
           console.log('print json['+i+']=> '+JSON.stringify(one));
        }
        console.log('end');
});*/


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

client.on('chat', function(channel, user, message, self){
	if(self) return;
	if(message == "테스트"){
		
	}
	if(user['display-name'] == '싹둑' || user['display-name'] == 'nightbot'){}
	else{
		if(channel == mychannel){
			if(message.match('!명령어') == "!명령어"){
				var command = message.split(' ');
				if((user.badges.broadcaster || user.mod) && 
				message.substring(5,7) == "추가")
				{	
					client.say(mychannel, "'" + command[2] + "' 명령어가 등록되었습니다." );
				}
				else{
					client.say(mychannel, "그런게있을것같니");
				}
			}
			
			if(message.substring(0,3) == "!멤버"){
				var commandMember = message.split(' ');
				
				if((user.badges.broadcaster || user.mod) && 
				message.substring(4,6) == "추가") 
					client.say(mychannel, commandMember[2]+ "님이 등록되었습니다." );
					
				else{
					client.say(mychannel, "현재멤버 : ");
				}
			}
		}
	}
});