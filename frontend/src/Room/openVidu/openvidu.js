var OV;
var session;

var roomListId = "roomViewUser";

var myTocken;
var isStart = false;

// serverurl
// let serverUrl = "https://corns.co.kr:4463/";
let serverUrl = "https://corns.co.kr:4463/";

if (
  window.location.href.includes("localhost") ||
  window.location.href.includes("127.0.0.1")
) {
  serverUrl = "https://corns.co.kr:4463/";
}

// 칸이 차 있는지
var userArray = [false, false, false, false];

var mySessionId;
var myUserName;
var jRoomNo;
var userId;

var subject; // = urlParams.get('subject');
var type; // = urlParams.get('type');
var time; // = urlParams.get('time');
var count; // = urlParams.get('count');

var accessToken;

var myStream;
var myPublisher;

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
  session.on("streamCreated", (event) => {
    // Subscribe to the Stream to receive it. HTML video will be appended to element with roomListId id
    var roomno;
    if (userArray[0] === false) {
      roomno = "roomViewUser2";
      userArray[0] = true;
    } else if (userArray[1] === false) {
      roomno = "roomViewUser3";
      userArray[1] = true;
    } else if (userArray[2] === false) {
      roomno = "roomViewUser4";
      userArray[2] = true;
    }

    var subscriber = session.subscribe(event.stream, roomno);

    // When the HTML video has been appended to DOM...
    subscriber.on("videoElementCreated", (event) => {
      // 누군가 새로운 사람이 들어오면 여기에 뜬다.
      // 2번부터 띄워준다.
      appendUserData(event.element, subscriber.stream.connection, roomno);
      initRoomInfo();
    });
  });

  // On every Stream destroyed...
  session.on("streamDestroyed", (event) => {
    // Delete the HTML element with the user's nickname. HTML videos are automatically removed from DOM
    removeUserData(event.stream.connection);
    getConnections(mySessionId).then((data) => {
      if (data.numberOfElements == 1 && isStart) {
        $("#roomViewAppTitle").text("투표할 따봉멤버가 없어요 T_T");
        endConversation();
        setMember(); // 베스트 멤버 뽑자!
      }
    });

    // if(event.stream)
    initRoomInfo();
  });

  // On every asynchronous exception...
  session.on("exception", (exception) => {
    console.warn(exception);
  });

  // Listen the speechToText events for showing them on page view
  session.on("speechToTextMessage", (event) => {
    // 여기에서 스크립트 만드는 api 호출
    if (event.reason === "recognized") {
      console.log(event.text);
      var scriptData = {
        roomNo: jRoomNo,
        sentence: event.text,
        time: "",
        userId: userId,
      };

      $.ajax({
        type: "POST",
        url: serverUrl + "/room/script",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + accessToken,
          "Access-Control-Allow-Credentials": "true",
        },
        contentType: "application/json",
        data: JSON.stringify(scriptData),
        success: function (data, textStatus, xhr) {
          console.log("스크립트저장");
        },
        error: function (request, status, error) {
          console.log(request);
          console.log(status);
          console.log(error);
        },
      });
    }
  });

  // --- 4) Connect to the session with a valid user token ---
  // 세션아이디로 토큰 받아오기
  getToken(mySessionId).then((token) => {
    token = token.token;
    myTocken = token;
    session
      .connect(token, { userId: userId, userName: myUserName })
      .then(() => {
        // 입장이나 방만들기 하기 전에 접속된 방이 있다면 나가기 처리를 해준다.
        outAllRoom();

        // --- 5) Set page layout for active call ---
        // 내가 무조건 1번에 뜨게 한다.
        // --- 6) Get your own camera stream with the desired properties ---
        var publisher = OV.initPublisher("roomViewUser1", {
          audioSource: undefined, // The source of audio. If undefined default microphone
          videoSource: undefined, // The source of video. If undefined default webcam
          publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
          publishVideo: true, // Whether you want to start publishing with your video enabled or not
          // resolution: videoWidth + 'x' + videoHeight,//'480x250',  // The resolution of your video
          resolution: "640x360",
          frameRate: 30, // The frame rate of your video
          insertMode: "APPEND", // How the video is inserted in the target element roomListId
          mirror: true, // Whether to mirror your local video or not
        });

        // --- 7) Specify the actions when events take place in our publisher ---

        // When our HTML video has been added to DOM...
        publisher.on("videoElementCreated", function (event) {
          appendUserData(event.element, myUserName, "");
          // alert(document.getElementById("startSttttt"))
          // appendCaptionsButton(event.element, publisher.stream);
          setSttButton(publisher.stream);
          // this.session.subscribeToSpeechToText(publisher.myStream, 'en-US');
          myStream = publisher.stream;
          myPublisher = publisher;
        });

        // --- 8) Publish your stream ---

        session.publish(publisher);
      })
      .catch((error) => {
        console.log(
          "There was an error connecting to the session:",
          error.code,
          error.message
        );
      });
  });

  // 이벤트 받기
  session.on("signal", (event) => {
    // console.log("session");
    // console.log(session)
    //시작
    if (event.type === "signal:start") {
      // this.session.subscribeToSpeechToText(myStream, "en-US");
      // callstt();
      console.log("start 받음")
      $("#startSttttt").trigger('onclick');

      setNoOneBlack();
      isStart = true;

      var x = setInterval(function () {
        //parseInt() : 정수를 반환
        var min = parseInt(totalTime / 60); //몫을 계산
        var sec = totalTime % 60; //나머지를 계산

        $("#roomViewLastTimer").text(min + ":" + sec);
        // document.getElementById("demo").innerHTML = min + "분" + sec + "초";
        totalTime--;

        //타임아웃 시
        if (totalTime < 0) {
          clearInterval(x); //setInterval() 실행을 끝냄
          // alert("대화끝!");
          endConversation();
          setMember(); // 베스트 멤버 뽑자!
        }
      }, 1000);
    }
    //채팅
    else {
      //width:80%; margin:10px;
      var o_html =
        `<div style="width:80%; margin:10px;">` + event.data + `</div>`;
      $("#roomViewChattingReceive").append(o_html);
    }
  });
}

async function callstt(){
	await this.session.subscribeToSpeechToText(myStream, 'en-US');
}

function setSttButton(stream) {

	document.getElementById("startSttttt").onclick = async (ev) => {
    console.log("stream 정보입니다.");
    console.log(stream)
    await this.session.subscribeToSpeechToText(stream, 'en-US');
	};

  // $("#startSttttt").onclick=async ()=>{
  //   // await promiseExample();
  //   alert("sttttttttttttttttttt");
  //   await this.session.subscribeToSpeechToText(stream, 'en-US');
  // };
}

function goToEvolution() {
  window.location.href = "https://corns.co.kr:4438/resultEvolution/" + jRoomNo;
}

function setMember() {
  // 따봉뽑기 창 열자!
  $("#roomViewApp").css("display", "block");
  // 대화 종료 후 따봉멤버 뽑을 멤버 리스트
  $.ajax({
    type: "GET",
    url: serverUrl + "room/" + jRoomNo + "/users",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + accessToken,
      "Access-Control-Allow-Credentials": "true",
    },
    contentType: "application/json",
    success: function (data, textStatus, xhr) {
      for (var i = 0; i < data.roomUsers.length; i++) {
        if (data.roomUsers[i].user.userId != userId) {
          $("#roomViewAppMember" + (i + 1) + "img")
            .parent()
            .parent()
            .css("display", "block");

          if (data.roomUsers[i].user.imgUrl == null) {
            $("#roomViewAppMember" + (i + 1) + "img").attr(
              "src",
              `data:image/png;base64,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`
            );
          } else {
            $("#roomViewAppMember" + (i + 1) + "img").attr(
              "src",
              data.roomUsers[i].user.imgUrl
            );
          }

          $("#selectBestMember" + (i + 1)).attr(
            "value",
            data.roomUsers[i].user.userId
          );
          $("#roomViewAppMember" + (i + 1) + "name").text(
            data.roomUsers[i].user.nickname +
              " #" +
              data.roomUsers[i].user.userId
          );
        }
      }
      var __time = 10;

      var x = setInterval(function () {
        $("#roomViewAppTimer").text(__time);

        __time--;

        //타임아웃 시
        if (__time < 0) {
          clearInterval(x); //setInterval() 실행을 끝냄
          // 고른거 있으면 넘기고
          if ($("input[name='selectBestMember']:checked").val()) {
            var best = {
              fromUserId: userId,
              roomNo: jRoomNo,
              toUserId: $("input[name='selectBestMember']:checked").val(),
            };
            $.ajax({
              type: "POST",
              url: serverUrl + "evaluation/thumb",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Basic " + accessToken,
                "Access-Control-Allow-Credentials": "true",
              },
              contentType: "application/json",
              data: JSON.stringify(best),
              success: function (data, textStatus, xhr) {
                console.log(data);
                console.log(textStatus);
                console.log(xhr);
                console.log("따봉멤버 투표완료");
              },
              error: function (request, status, error) {
                // alert("방 입장처리 실패 : " + request.statusText);
                console.log(request);
                console.log(status);
                console.log(error);
              },
            });
          }

          // alert("https://localhost:3000/resultEvolution/" + jRoomNo)

          // 페이지 이동!
          if (
            window.location.href.includes("localhost") ||
            window.location.href.includes("127.0.0.1")
          ) {
            window.location.href =
              "https://localhost:3000/resultEvolution/" + jRoomNo; // 원하는 매개변수 넘길 예정~
          } else {
            window.location.href =
              "https://corns.co.kr:4438/resultEvolution/" + jRoomNo; // 원하는 매개변수 넘길 예정~
          }
        }
      }, 1000);

      console.log(data);
      console.log(textStatus);
      console.log(xhr);
    },
    error: function (request, status, error) {
      console.log("setMember Error");
      console.log(request);
      console.log(status);
      console.log(error);
    },
  });
}

function onKeyUpChatting() {
  if (window.event.keyCode == 13) {
    sendChatting();
  }
}

function sendToOpenvidu(type, data) {
  var senddata = {
    session: mySessionId,
    type: type,
    data: data,
  };

  $.ajax({
    type: "POST",
    url: OPENVIDU_URL + "openvidu/api/signal",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + OPENVIDU_SECRET,
      "Access-Control-Allow-Origin": "*",
    },
    data: JSON.stringify(senddata),
    success: function (data, textStatus, xhr) {
      console.log(data);
      console.log(textStatus);
      console.log(xhr);
      console.log("채팅 전송완료");
      if (type === "chat") {
        $("#roomViewChattingSendMessage").val("");
      }
    },
    error: function (request, status, error) {
      // alert("채팅처리 실패 : " + request.statusText);
      console.log(request);
      console.log(status);
      console.log(error);
    },
  });
}

function sendChatting() {
  if ($("#roomViewChattingSendMessage").val().length === 0) {
    alert("메세지 내용을 입력해주세요.");
    $("#roomViewChattingSendMessage").focus();
  } else {
    sendToOpenvidu(
      "chat",
      myUserName + " : " + $("#roomViewChattingSendMessage").val()
    );
  }
}

// 방 입장 처리
function intoRoom(connectionId, recordId, token) {
  var data = {
    roomNo: jRoomNo,
    roomUser: {
      connectionId: connectionId,
      recordId: recordId,
      token: token,
    },
    userId: userId,
  };

  $.ajax({
    type: "POST",
    url: serverUrl + "room/user",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + accessToken,
      "Access-Control-Allow-Credentials": "true",
    },
    contentType: "application/json",
    data: JSON.stringify(data),
    success: function (data, textStatus, xhr) {
      if (xhr.status != 200) {
        if (
          window.location.href.includes("localhost") ||
          window.location.href.includes("127.0.0.1")
        ) {
          window.location.href = "https://localhost:3000/conversation";
        } else {
          window.location.href = "https://corns.co.kr:4438/conversation";
        }
      }
      console.log(data);
      console.log(textStatus);
      console.log(xhr.status);
      console.log("입장처리 완료");
      initRoomInfo();
    },
    error: function (request, status, error) {
      alert("실패");
      // alert("방 입장처리 실패 : " + request.statusText);
      console.log(request);
      console.log(status);
      console.log(error);
      if (
        window.location.href.includes("localhost") ||
        window.location.href.includes("127.0.0.1")
      ) {
        window.location.href = "https://localhost:3000/conversation";
      } else {
        window.location.href = "https://corns.co.kr:4438/conversation";
      }
    },
  });
}

function outRoom(rUserId) {
  // 떠나는 사람 방 번호 받는다.
  var data = {
    roomNo: jRoomNo,
    userId: rUserId,
  };

  $.ajax({
    type: "PATCH",
    url: serverUrl + "room/user",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + accessToken,
      "Access-Control-Allow-Credentials": "true",
    },
    contentType: "application/json",
    data: JSON.stringify(data),
    success: function (data, textStatus, xhr) {
      console.log(data);
      console.log(textStatus);
      console.log(xhr);
      console.log("퇴장처리 완료");
    },
    error: function (request, status, error) {
      console.log(request);
      console.log(status);
      console.log(error);
    },
  });
}

function outOneRoom(rUserId, roomNo, current, total) {
  // 떠나는 사람 방 번호 받는다.

  var outdata = {
    roomNo: roomNo,
    userId: rUserId,
  };

  console.log("roomNo : " + roomNo);
  console.log("userId : " + rUserId);
  $.ajax({
    type: "PATCH",
    url: serverUrl + "room/user",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + accessToken,
      "Access-Control-Allow-Credentials": "true",
    },
    contentType: "application/json",
    data: JSON.stringify(outdata),
    success: function (data, textStatus, xhr) {
      console.log(data);
      console.log(textStatus);
      console.log(xhr);
      console.log("퇴장처리 완료");
      if (current === total - 1) {
        makeOrIntoRoom();
      }
    },
    error: function (request, status, error) {
      console.log("방 퇴장처리 실패 : " + request.statusText);
      console.log(request);
      console.log(status);
      console.log(error);
    },
  });
}

function appendUserData(videoElement, connection, roomno) {
  if (roomno !== "") {
    var dataNode = document.createElement("div");
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

  if (pid === "roomViewUser2") {
    userArray[0] = false;
  } else if (pid === "roomViewUser3") {
    userArray[1] = false;
  } else if (pid === "roomViewUser4") {
    userArray[2] = false;
  }

  console.log("ruserData");
  console.log(connection);
  var rUserData = JSON.parse(connection.data);
  console.log(rUserData);
}

var OPENVIDU_URL = "https://corns.co.kr:4430/";

var OPENVIDU_SECRET = btoa("OPENVIDUAPP:a506w6w");
function getToken(mySessionId) {
  return createToken(mySessionId);
}

function createSession(sessionId) {
  console.log(sessionId);
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
      type: "POST",
      url: OPENVIDU_URL + "openvidu/api/sessions/" + sessionId + "/connection", // 새 연결 만들기
      data: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + OPENVIDU_SECRET,
        "Access-Control-Allow-Origin": "*",
      },
      success: (response) => resolve(response), // The token
      error: (error) => reject(error),
    });
  });
}

function getConnection(sessionId) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: OPENVIDU_URL + "openvidu/api/sessions/" + sessionId + "/connection/",
      type: "GET",
      headers: {
        Authorization: "Basic " + OPENVIDU_SECRET,
        "Access-Control-Allow-Origin": "*",
      },
      success: (data) => {
        resolve(data);
      },
      error: (data) => {
        reject(data);
      },
    });
  });
}

function getConnections(sessionId) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: OPENVIDU_URL + "openvidu/api/sessions/" + sessionId + "/connection/",
      type: "GET",
      headers: {
        Authorization: "Basic " + OPENVIDU_SECRET,
        "Access-Control-Allow-Origin": "*",
      },
      success: (data) => {
        resolve(data);
      },
      error: (data) => {
        reject(data);
      },
    });
  });
}

// 대화 시작
function startConversation() {
  var sendData = {
    roomNo: jRoomNo,
  };
  $.ajax({
    type: "PATCH",
    url: serverUrl + "room/start",
    data: JSON.stringify(sendData),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + accessToken,
      "Access-Control-Allow-Credentials": "true",
    },
    contentType: "application/json",
    success: function (data, textStatus, xhr) {
      console.log(data);
      if (xhr.status == 200) {
        sendToOpenvidu("start", "data");
      } else {
        alert("대화를 시작할수없습니다.");
      }
    },
    error: function (request, status, error) {
      console.log(request);
      console.log(status);
      console.log(error);
    },
  });
}

var maxMemberCount = 0;

// 방 정보 세팅
function initRoomInfo() {
  console.log("initRoomInfo");
  $.ajax({
    type: "GET",
    url: serverUrl + "room/" + jRoomNo,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + accessToken,
      "Access-Control-Allow-Credentials": "true",
    },
    contentType: "application/json",
    success: function (data, textStatus, xhr) {
      // 만약 갱신되는데 시작했고 한명이면 대화 종료!
      if (isStart && data.room.room.currentMember == 1) {
        endConversation();
        setMember(); // 베스트 멤버 뽑자!
      }
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
      else {
        $("#roomViewTitle").text(
          data.room.room.title + "   [" + data.room.subject.value + "]"
        );
        $("#roomViewTimer").text(data.room.room.time + "분");
        $("#roomViewLastTimer").text(data.room.room.time + ":00");
        totalTime = data.room.room.time * 1;
        maxMemberCount = data.room.room.maxMember;
        console.log("현재 인원 : " + data.room.room.currentMember);
        setMemberCount(data.room.room.currentMember);

        // 방장이면 시작하기 버튼 세팅
        if (data.room.room.hostUserId == userId) {
          $("#roomViewPlay").show();
        }
      }
      console.log(data);
      console.log(textStatus);
      console.log(xhr);
    },
    error: function (request, status, error) {
      console.log(request);
      console.log(status);
      console.log(error);
    },
  });
}

function setMemberCount(curr) {
  $("#roomViewMemberCount").text(curr + "/" + maxMemberCount);
}

function saveWord() {
  var q_word = $("#q_word").val();
  var a_word = $("#a_word").val();

  var saveData = {
    userId: userId,
    wordEng: q_word,
    wordKor: a_word,
  };

  $.ajax({
    type: "POST",
    url: serverUrl + "/word",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + accessToken,
      "Access-Control-Allow-Credentials": "true",
    },
    contentType: "application/json",
    data: JSON.stringify(saveData),
    success: function (data, textStatus, xhr) {
      console.log("단어저장");
      $("#q_word").val("");
      $("#a_word").val("");
    },
    error: function (request, status, error) {
      console.log(request);
      console.log(status);
      console.log(error);
    },
  });
}

var audioEnabled = true;
var videoEnabled = true;

function MikeToggle() {
  // alert("mike")
  // myPublisher.stream.audioActive = !myPublisher.stream.audioActive;
  audioEnabled = !audioEnabled;
  myPublisher.publishAudio(audioEnabled); // true to unmute the audio track, false to mute it
  if (!audioEnabled) {
    // 불투명처리
    $("#roomViewMike").css("opacity", 0.3);
  } else {
    $("#roomViewMike").css("opacity", 1.0);
  }
}

function VideoToggle() {
  videoEnabled = !videoEnabled;
  myPublisher.publishVideo(videoEnabled); // true to enable the video track, false to disable it

  if (!videoEnabled) {
    // 불투명처리
    $("#roomViewVideo").css("opacity", 0.3);
  } else {
    $("#roomViewVideo").css("opacity", 1.0);
  }
}

function toogleChatting() {
  if ($("#roomViewTranslation").css("display") == "none") {
    $("#roomViewTranslation").css("display", "block");
  } else {
    $("#roomViewTranslation").css("display", "none");
  }
}

function outRoomBtn() {
  outRoom(userId);
  if (
    window.location.href.includes("localhost") ||
    window.location.href.includes("127.0.0.1")
  ) {
    window.location.href = "https://localhost:3000/conversation";
  } else {
    window.location.href = "https://corns.co.kr:4438/conversation";
  }
}

function setNoOneBlack() {
  // 시작하면 비어있는 칸은 검정엑스
  $(".roomViewUser").each(function (index, item) {
    // alert($(this).html())
    // console.log($(this));
    if ($(this).html().includes("video") != true) {
      $(this).html(
        `<i class="fa-regular fa-rectangle-xmark" style="font-size: 200; margin-left:200; margin-top:80"></i>`
      );
    }
  });
}

function outAllRoom() {
  $.ajax({
    type: "GET",
    url: serverUrl + "room/list/" + userId,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + accessToken,
      "Access-Control-Allow-Credentials": "true",
    },
    contentType: "application/json",
    success: function (data, textStatus, xhr) {
      // alert(data.rooms.length)
      if (data != null && data.rooms != null && data.rooms.length > 0) {
        // alert("있음!")
        for (var i = 0; i < data.rooms.length; i++) {
          outOneRoom(userId, data.rooms[i].room.roomNo, i, data.rooms.length);
        }
      } else {
        makeOrIntoRoom();
      }

      console.log(data);
      console.log(textStatus);
      console.log(xhr);
    },
    error: function (request, status, error) {
      console.log("입장한 방 리스트 불러오기 : " + request.statusText);
      console.log(request);
      console.log(status);
      console.log(error);
    },
  });
}

function makeOrIntoRoom() {
  // 퇴장처리 다 하면
  // 방이 없으면 만들어줘야 한다.
  if (!jRoomNo) {
    // 방 만들어야한다.
    var makeroomdata = {
      room: {
        maxMember: count,
        sessionId: mySessionId,
        subjectNo: type,
        time: time,
        title: subject,
      },
      roomUser: {
        connectionId: userId,
        recordId: "",
        token: "",
      },
      userId: userId,
    };
    $.ajax({
      type: "POST",
      url: serverUrl + "room",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + accessToken,
        "Access-Control-Allow-Credentials": "true",
      },
      contentType: "application/json",
      data: JSON.stringify(makeroomdata),
      success: function (data, textStatus, xhr) {
        jRoomNo = data.room.room.roomNo;
        $("#jRoomNo").val(jRoomNo);
        initRoomInfo();
        console.log("방 만들기");
        console.log(data);
        console.log(textStatus);
        console.log(xhr);
      },
      error: function (request, status, error) {
        console.log(request);
        console.log(status);
        console.log(error);
      },
    });
  } else {
    //쫑알룸 번호가 있다

    // 방 입장처리 한다.
    intoRoom(myUserName, "", myTocken);
  }
}

function endConversation() {
  var sendData = {
    roomNo: jRoomNo,
  };
  $.ajax({
    type: "PATCH",
    url: serverUrl + "room/end",
    data: JSON.stringify(sendData),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + accessToken,
      "Access-Control-Allow-Credentials": "true",
    },
    contentType: "application/json",
    success: function (data, textStatus, xhr) {
      console.log(data);
      // 대화 종료 하고
    },
    error: function (request, status, error) {
      console.log(request);
      console.log(status);
      console.log(error);
    },
  });
}
