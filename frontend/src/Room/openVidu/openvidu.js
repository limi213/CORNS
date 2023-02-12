var OV;
var session;

var roomListId = "roomViewUser";

// serverurl
// let serverUrl = "https://corns.co.kr:4463/";
let serverUrl = "https://corns.co.kr:4463/";

if(window.location.href.includes("localhost") || window.location.href.includes("127.0.0.1")){
	serverUrl = "https://corns.co.kr:4463/";
}

// 칸이 차 있는지
var userArray = [false,false,false,false];

var mySessionId;
var myUserName;
var jRoomNo;
var userId;

var subject;// = urlParams.get('subject');
var type;// = urlParams.get('type');
var time;// = urlParams.get('time');
var count;// = urlParams.get('count');

var accessToken;

var myStream;

var totalTime;

/* OPENVIDU METHODS */

function joinSession() {

	// 초기 데이터 처리
	mySessionId = document.getElementById("sessionId").value;
	myUserName = document.getElementById("userName").value;
	jRoomNo = document.getElementById("jRoomNo").value;
	userId = document.getElementById("userId").value;

	subject = document.getElementById("subject").value;
	type = document.getElementById("type").value;
	time = document.getElementById("time").value;
	count = document.getElementById("count").value;

	accessToken = document.getElementById("accessToken").value;

	// --- 1) Get an OpenVidu object ---

	OV = new OpenVidu();

	// --- 2) Init a session ---

	session = OV.initSession();

	// On every new Stream received...
	session.on('streamCreated', event => {
		// Subscribe to the Stream to receive it. HTML video will be appended to element with roomListId id
		var roomno;
		if(userArray[0] === false){
			roomno = "roomViewUser2";
			userArray[0] = true;
		}
		else if(userArray[1] === false){
			roomno = "roomViewUser3";
			userArray[1] = true;
		}
		else if(userArray[2] === false){
			roomno = "roomViewUser4";
			userArray[2] = true;
		}

		var subscriber = session.subscribe(event.stream, roomno);
	
		// When the HTML video has been appended to DOM...
		subscriber.on('videoElementCreated', event => {
			// 누군가 새로운 사람이 들어오면 여기에 뜬다.
			// 2번부터 띄워준다.
			appendUserData(event.element, subscriber.stream.connection, roomno);
		});
		
		
	});

	// On every Stream destroyed...
	session.on('streamDestroyed', event => {
		// Delete the HTML element with the user's nickname. HTML videos are automatically removed from DOM
		removeUserData(event.stream.connection);
	});

	// On every asynchronous exception...
	session.on('exception', (exception) => {
		console.warn(exception);
	});

	// Listen the speechToText events for showing them on page view
	session.on('speechToTextMessage', (event) => {
		// 여기에서 스크립트 만드는 api 호출
		if (event.reason === "recognized") {
			console.log(event.text);
			var scriptData = {
				"roomNo": jRoomNo,
				"sentence": event.text,
				"time": "",
				"userId": userId
			};

			$.ajax({
				type : "POST",
				url : serverUrl + "/room/script",    
				headers: { "Content-Type": "application/json",
							"Authorization" : "Basic " + accessToken,
							"Access-Control-Allow-Credentials" : "true"},    
				contentType : "application/json",
				data : JSON.stringify(scriptData),
				success: function(data, textStatus, xhr) {
					console.log("스크립트저장")
					
				},
				error:function(request,status,error){
					console.log(request);
					console.log(status);
					console.log(error);
				}
			});
		}
	});


	// --- 4) Connect to the session with a valid user token ---
	// 세션아이디로 토큰 받아오기
	getToken(mySessionId).then(token => {
		token = token.token;
		session.connect(token, { userId : userId, userName: myUserName })
			.then(() => {
				// 방이 없으면 만들어줘야 한다.
				if(!jRoomNo){
					// 방 만들어야한다.
					var makeroomdata = {
						"room": {
							"maxMember": count,
							"sessionId": mySessionId,
							"subjectNo": type,
							"time": time,
							"title": subject
						},
						"roomUser": {
							"connectionId": userId,
							"recordId": "",
							"token": ""
						},
						"userId": userId
					}

					$.ajax({
						type : "POST",
						url : serverUrl + "room",    
						headers: { "Content-Type": "application/json",
									"Authorization" : "Basic " + accessToken,
									"Access-Control-Allow-Credentials" : "true"},    
						contentType : "application/json",
						data : JSON.stringify(makeroomdata),
						success: function(data, textStatus, xhr) {
							jRoomNo = data.room.room.roomNo;
							initRoomInfo();
							console.log("방 만들기")
							console.log(data);
							console.log(textStatus);
							console.log(xhr);
							
						},
						error:function(request,status,error){
							console.log(request);
							console.log(status);
							console.log(error);
						}
					});

				}else{	//쫑알룸 번호가 있다
						
					// 방 입장처리 한다.
					intoRoom(myUserName, '', token);
				}
		

				// --- 5) Set page layout for active call ---
				// 내가 무조건 1번에 뜨게 한다.
				// --- 6) Get your own camera stream with the desired properties ---
				var publisher = OV.initPublisher("roomViewUser1", {
					audioSource: undefined, // The source of audio. If undefined default microphone
					videoSource: undefined, // The source of video. If undefined default webcam
					publishAudio: true,  	// Whether you want to start publishing with your audio unmuted or not
					publishVideo: true,  	// Whether you want to start publishing with your video enabled or not
					// resolution: videoWidth + 'x' + videoHeight,//'480x250',  // The resolution of your video
					resolution: '640x360',
					frameRate: 30,			// The frame rate of your video
					insertMode: 'APPEND',	// How the video is inserted in the target element roomListId
					mirror: true       	// Whether to mirror your local video or not
				});

				// myStream = publisher.stream;

				// --- 7) Specify the actions when events take place in our publisher ---

				// When our HTML video has been added to DOM...
				publisher.on('videoElementCreated', function (event) {
					appendUserData(event.element, myUserName, "");
					// alert(document.getElementById("startSttttt"))
					appendCaptionsButton(event.element, publisher.stream);
				});
				// myStream = publisher.stream;
				// console.log("myStream");
				// console.log(myStream);
				

				// --- 8) Publish your stream ---

				session.publish(publisher);
				

			})
			.catch(error => {
				console.log('There was an error connecting to the session:', error.code, error.message);
			});
	});


	// 이벤트 받기
	session.on('signal', (event) => {
		//시작
		if(event.type==="signal:start"){
			this.session.subscribeToSpeechToText(myStream, 'en-US');
			// 시작했다는 알림 받음
			// $("#roomViewLastTimer").text(data.room.room.time + ":00");
			// totalTime = data.room.room.time * 60;

			var x = setInterval(function() {
				//parseInt() : 정수를 반환
				var min = parseInt(totalTime/60); //몫을 계산
				var sec = totalTime%60; //나머지를 계산
		
				$("#roomViewLastTimer").text(min + ":" + sec);
				// document.getElementById("demo").innerHTML = min + "분" + sec + "초";
				totalTime--;
		
				//타임아웃 시
				if (totalTime < 0) {
					clearInterval(x); //setInterval() 실행을 끝냄
					// alert("대화끝!");
					var sendData = {
						"roomNo": jRoomNo
					};
					$.ajax({
						type : "PATCH",
						url : serverUrl + "room/end" ,
						data :  JSON.stringify(sendData),
						headers: { "Content-Type": "application/json",
									"Authorization" : "Basic " + accessToken,
									"Access-Control-Allow-Credentials" : "true"},     
						contentType : "application/json",
						success: function(data, textStatus, xhr) {
							console.log(data)
							// sendToOpenvidu("start", "data");
						},
						error:function(request,status,error){
							// alert("방 퇴장처리 실패 : " + request.statusText);
							console.log(request);
							console.log(status);
							console.log(error);
						}
					});
				}
			}, 1000);
		}
		//채팅
		else{
			if(event.data.includes(myUserName + " : ")){
				// 내 메시지
				var c_html = `<div><div style="float:right; margin:10px; ">` + event.data + `</div><div>`;
				$("#roomViewChattingReceive").append(c_html);
				
			}
			else{
				// 남의 메시지
				var o_html = `<div style="float:left; margin:10px;">` + event.data + `</div>`;
				$("#roomViewChattingReceive").append(o_html);
			}
		}
		
	});

}

function onKeyUpChatting(){
	if (window.event.keyCode == 13){
		sendChatting();
	}
}

function sendToOpenvidu(type, data){
	var senddata = {
		"session":mySessionId,
		"type":type,
		"data":data
	};
	
	$.ajax({
		type : "POST",
		url : OPENVIDU_URL + "openvidu/api/signal",
		headers: { "Content-Type": "application/json",
					"Authorization" : "Basic " + OPENVIDU_SECRET,
					"Access-Control-Allow-Origin" : "*"},
		data: JSON.stringify(senddata),
		success: function(data, textStatus, xhr) {
			console.log(data);
			console.log(textStatus);
			console.log(xhr);
			console.log("채팅 전송완료");
			if(type === "chat"){
				$("#roomViewChattingSendMessage").val("");
			}
		},
		error:function(request,status,error){
			// alert("채팅처리 실패 : " + request.statusText);
			console.log(request);
			console.log(status);
			console.log(error);
		}
	});
}

function sendChatting(){
	if($("#roomViewChattingSendMessage").val().length === 0){
		alert("메세지 내용을 입력해주세요.");
		$("#roomViewChattingSendMessage").focus();
	}
	else{
		sendToOpenvidu("chat", myUserName + " : " + $("#roomViewChattingSendMessage").val());
	}
}


function appendCaptionsButton(videoElement,myStream1) {

	myStream = myStream1;
	document.getElementById("startSttttt").onmouseup = async (ev) => {
		await this.session.subscribeToSpeechToText(myStream1, 'en-US');
	};
}


// 방 입장 처리
function intoRoom(connectionId, recordId, token){
	var data = {
		"roomNo": jRoomNo,
		"roomUser": {
			"connectionId": connectionId, 
			"recordId": recordId,
			"token": token
		},
		"userId": userId
	};
	

	$.ajax({
		type : "POST",
		url : serverUrl + "room/user",    
		headers: { "Content-Type": "application/json",
					"Authorization" : "Basic " + accessToken,
					"Access-Control-Allow-Credentials" : "true"},    
		contentType : "application/json",
		data : JSON.stringify(data),
		success: function(data, textStatus, xhr) {
			console.log(data);
			console.log(textStatus);
			console.log(xhr);
			console.log("입장처리 완료");
			initRoomInfo();
		},
		error:function(request,status,error){
			// alert("방 입장처리 실패 : " + request.statusText);
			console.log(request);
			console.log(status);
			console.log(error);
			if(request.status === 409){
				console.log("이미 접속완료된 회원");
				// 어디방인지 확인하고 이 방 아니면 나가게하자
			}
		}
	});
}

function outRoom(rUserId){	// 떠나는 사람 방 번호 받는다.
	var data = {
		"roomNo": jRoomNo,
		"userId": rUserId
	};

	$.ajax({
		type : "PATCH",
		url : serverUrl + "room/user",      
		headers: { "Content-Type": "application/json",
					"Authorization" : "Basic " + accessToken,
					"Access-Control-Allow-Credentials" : "true"},   
		contentType : "application/json",
		data : JSON.stringify(data),
		success: function(data, textStatus, xhr) {
			console.log(data);
			console.log(textStatus);
			console.log(xhr);
			console.log("퇴장처리 완료");
		},
		error:function(request,status,error){
			// alert("방 퇴장처리 실패 : " + request.statusText);
			console.log(request);
			console.log(status);
			console.log(error);
			if(request.status === 409){
				console.log("이미 접속완료된 회원");
				// 어디방인지 확인하고 이 방 아니면 나가게하자
			}
		}
	});
}

function appendUserData(videoElement, connection, roomno) {
	
	if(roomno !== ""){var dataNode = document.createElement('div');
		dataNode.className = "data-node";
		dataNode.id = "data-" + connection.connectionId;
		dataNode.roomno = "__" + roomno;
		videoElement.parentNode.insertBefore(dataNode, videoElement.nextSibling);
	}
}


function removeUserData(connection) {

	// 부모의 아이디 찾아서 false 처리
	var dataNode = document.getElementById("data-" + connection.connectionId);
	var pid = dataNode.parentElement.id;

	if(pid === "roomViewUser2"){
		userArray[0] = false;
	}
	else if(pid === "roomViewUser3"){
		userArray[1] = false;
	}
	else if(pid === "roomViewUser4"){
		userArray[2] = false;
	}

	console.log("ruserData");
	console.log(connection);
	var rUserData = JSON.parse(connection.data);
	console.log(rUserData);

	// outRoom(rUserData.userId);
}


var OPENVIDU_URL= "https://corns.co.kr:4430/";

var OPENVIDU_SECRET = btoa("OPENVIDUAPP:a506w6w");
function getToken(mySessionId) {
	return createToken(mySessionId);
}

function createSession(sessionId) {
	console.log(sessionId)
	// return new Promise((resolve, reject) => {
	// 	$.ajax({
	// 		type: "POST",
	// 		// url: APPLICATION_SERVER_URL + "api/sessions",
	// 		url: OPENVIDU_URL + "openvidu/api/sessions",
	// 		data: JSON.stringify({ customSessionId: sessionId }),
	// 		headers: { 	"Content-Type": "application/json",
	// 					 "Authorization" : "Basic " + OPENVIDU_SECRET,
	// 					 "Access-Control-Allow-Origin" : "*"},
	// 		success: response => resolve(response), // The sessionId
	// 		error: (error) => reject(error)
	// 	});
	// });
}

function createToken(sessionId) {
	return new Promise((resolve, reject) => {
		$.ajax({
			type: 'POST',
			url: OPENVIDU_URL + 'openvidu/api/sessions/' + sessionId + '/connection',	// 새 연결 만들기
			data: JSON.stringify({}),
			headers: { "Content-Type": "application/json",
						"Authorization" : "Basic " + OPENVIDU_SECRET,
						"Access-Control-Allow-Origin" : "*"},
			success: (response) => resolve(response), // The token
			error: (error) => reject(error)
		});
	});
}


function getConnection(sessionId){
	return new Promise((resolve, reject) => {
		$.ajax({
			url: OPENVIDU_URL + "openvidu/api/sessions/"+ sessionId + "/connection/",
			type: "GET",
			headers: { 	"Authorization" : "Basic " + OPENVIDU_SECRET,
						"Access-Control-Allow-Origin" : "*"},
			success: (data) => { resolve(data); },
			error: (data) => { reject(data); }
		});
	});
	
}

function getConnections(sessionId){
	return new Promise((resolve, reject) => {
		$.ajax({
			url: OPENVIDU_URL + "openvidu/api/sessions/"+ sessionId + "/connection/",
			type: "GET",
			headers: { 	"Authorization" : "Basic " + OPENVIDU_SECRET,
						"Access-Control-Allow-Origin" : "*"},
			success: (data) => { resolve(data); },
			error: (data) => { reject(data); }
		});
	});
	
}



// 대화 시작
function startConversation(){
	// 시작했다고 모두에게 알리기
	var sendData = {
		"roomNo": jRoomNo
	};
	$.ajax({
		type : "PATCH",
		url : serverUrl + "room/start" ,
		data :  JSON.stringify(sendData),
		headers: { "Content-Type": "application/json",
					"Authorization" : "Basic " + accessToken,
					"Access-Control-Allow-Credentials" : "true"},     
		contentType : "application/json",
		success: function(data, textStatus, xhr) {
			console.log("대화 시작");
			console.log(data)
			sendToOpenvidu("start", "data");
		},
		error:function(request,status,error){
			// alert("방 퇴장처리 실패 : " + request.statusText);
			console.log(request);
			console.log(status);
			console.log(error);
		}
	});
}

var maxMemberCount = 0;

// 방 정보 세팅
function initRoomInfo(){
	console.log("initRoomInfo")
	$.ajax({
		type : "GET",
		url : serverUrl + "room/" + jRoomNo, 
		headers: { "Content-Type": "application/json",
					"Authorization" : "Basic " + accessToken,
					"Access-Control-Allow-Credentials" : "true"},     
		contentType : "application/json",
		success: function(data, textStatus, xhr) {
			/* 
						{
			"room": {
				"room": {
				"roomNo": 30,
				"title": "쫑알!",
				"time": 10,
				"currentMember": 1,
				"maxMember": 4,
				"hostUserId": 1001,
				"sessionId": "ssss",
				"avail": true
				},
				"subject": {
				"subjectNo": 1,
				"imgUrl": "https://corns.co.kr:4435/uploads/subjects/1.jpg",
				"value": "일상"
				}
			}
			}*/

			// var roomData = JSON.parse(data);

			// console.log(roomData + "["alert(ata.room.room.title) + data.room.subject.value + "]");

			$("#roomViewTitle").text(data.room.room.title + "   [" + data.room.subject.value + "]");
			$("#roomViewTimer").text(data.room.room.time + "분");
			$("#roomViewLastTimer").text(data.room.room.time + ":00");
			totalTime = data.room.room.time * 60;
			maxMemberCount = data.room.room.currentMember;
			setMemberCount(data.room.room.currentMember);

			// 방장이면 시작하기 버튼 세팅
			if(data.room.room.hostUserId == userId){
				$("#roomViewPlay").show();
			}

			console.log(data);
			console.log(textStatus);
			console.log(xhr);
		},
		error:function(request,status,error){
			// alert("방 퇴장처리 실패 : " + request.statusText);
			console.log(request);
			console.log(status);
			console.log(error);
		}
	});
}


function setMemberCount(curr){
	$("#roomViewMemberCount").text(curr + "/" + maxMemberCount);
}