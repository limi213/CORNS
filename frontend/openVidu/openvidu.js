var OV;
var session;

var roomListId = "roomViewUser1";

/* OPENVIDU METHODS */

function joinSession() {

	var mySessionId = document.getElementById("sessionId").value;
	var myUserName = document.getElementById("userName").value;

	// --- 1) Get an OpenVidu object ---

	OV = new OpenVidu();

	// --- 2) Init a session ---

	session = OV.initSession();

	// --- 3) Specify the actions when events take place in the session ---
	// 현재 세션에 연결된 사용자들 띄우기
	// let connections = 
	getConnections(mySessionId).then(data => {
		if(data.numberOfElements > 0){
			for(let i = 0 ; i < data.numberOfElements ; i++){
				// console.log(data.content[i]);
				// console.log(data.content[i].stream);
			}	
		}
	});

	// On every new Stream received...
	session.on('streamCreated', event => {
		// Subscribe to the Stream to receive it. HTML video will be appended to element with roomListId id
		var subscriber = session.subscribe(event.stream, roomListId);

		// When the HTML video has been appended to DOM...
		subscriber.on('videoElementCreated', event => {
			console.log(event.element);
			// Add a new <p> element for the user's nickname just below its video
			// appendUserData(event.element, subscriber.stream.connection);
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


	// --- 4) Connect to the session with a valid user token ---
	// Get a token from the OpenVidu deployment
	getToken(mySessionId).then(token => {

		console.log("token : " + token.token);
		token = token.token;

		// First param is the token got from the OpenVidu deployment. Second param can be retrieved by every user on event
		// 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
		session.connect(token, { clientData: myUserName })
			.then(() => {

				// --- 5) Set page layout for active call ---

				// document.getElementById('session-title').innerText = mySessionId;
				// document.getElementById('join').style.display = 'none';
				// document.getElementById('session').style.display = 'block';

				// --- 6) Get your own camera stream with the desired properties ---

				var publisher = OV.initPublisher(roomListId, {
					audioSource: undefined, // The source of audio. If undefined default microphone
					videoSource: undefined, // The source of video. If undefined default webcam
					publishAudio: true,  	// Whether you want to start publishing with your audio unmuted or not
					publishVideo: true,  	// Whether you want to start publishing with your video enabled or not
					resolution: '480x250',  // The resolution of your video
					frameRate: 30,			// The frame rate of your video
					insertMode: 'APPEND',	// How the video is inserted in the target element roomListId
					mirror: true       	// Whether to mirror your local video or not
				});

				// --- 7) Specify the actions when events take place in our publisher ---

				// When our HTML video has been added to DOM...
				publisher.on('videoElementCreated', function (event) {
					// initMainVideo(event.element, myUserName);
					appendUserData(event.element, myUserName);
					// event.element['muted'] = true;
				});

				// --- 8) Publish your stream ---

				session.publish(publisher);

			})
			.catch(error => {
				console.log('There was an error connecting to the session:', error.code, error.message);
			});
	});

}

function appendUserData(videoElement, connection) {
	
	var userData;
	var nodeId;
	if (typeof connection === "string") {
		userData = connection;
		nodeId = connection;
	} else {
		userData = JSON.parse(connection.data).clientData;
		nodeId = connection.connectionId;
	}

	var dataNode = document.createElement('div');
	dataNode.className = "data-node";
	dataNode.id = "data-" + nodeId;
	dataNode.innerHTML = "<p>" + userData + "</p>";
	videoElement.parentNode.insertBefore(dataNode, videoElement.nextSibling);
}


function removeUserData(connection) {
	var dataNode = document.getElementById("data-" + connection.connectionId);
	dataNode.parentNode.removeChild(dataNode);
}


var APPLICATION_SERVER_URL = "http://localhost:5000/";

var OPENVIDU_URL= "http://localhost:4443/";
var OPENVIDU_SECRET = "MY_SECRET";

function getToken(mySessionId) {
	return createToken(mySessionId);
	// return createSession(mySessionId).then(sessionId => createToken(sessionId));
	// return getConnections(mySessionId).then(sessionId => createToken(sessionId));
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
	// 					 "Authorization" : "Basic T1BFTlZJRFVBUFA6TVlfU0VDUkVU",
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
			url: OPENVIDU_URL + 'openvidu/api/sessions/' + sessionId + '/connection',
			data: JSON.stringify({}),
			headers: { "Content-Type": "application/json",
						"Authorization" : "Basic T1BFTlZJRFVBUFA6TVlfU0VDUkVU",
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
			headers: { 	"Authorization" : "Basic T1BFTlZJRFVBUFA6TVlfU0VDUkVU",
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
			headers: { 	"Authorization" : "Basic T1BFTlZJRFVBUFA6TVlfU0VDUkVU",
						"Access-Control-Allow-Origin" : "*"},
			success: (data) => { resolve(data); },
			error: (data) => { reject(data); }
		});
	});
	
}