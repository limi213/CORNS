// import React from 'react';
import axios from "axios";


const MakeRoom = async (subject, type, time, count= false) => {
    // alert(subject);
    // alert(type);
    // alert(time);
    // alert(count);
    var OPENVIDU_URL= "https://corns.co.kr:4430";
    var OPENVIDU_SECRET = btoa("OPENVIDUAPP:a506w6w");

    const headers = {
        "Authorization" : "Basic " + OPENVIDU_SECRET,
		"Access-Control-Allow-Origin" : "*"
    };

    var senddata = {
        "mediaMode": "ROUTED",
        "recordingMode": "MANUAL",
        "defaultRecordingProperties": {
            "hasAudio": true,
            "hasVideo": true,
            "outputMode": "INDIVIDUAL"
        },
        "mediaNode": {
            "id": "media_3.36.120.19"
        }
    };

    axios.get(OPENVIDU_URL + "/openvidu/api/sessions", {
        // axios.get(OPENVIDU_URL + `/openvidu/api/sessions`, {
        headers:headers,
        data : JSON.stringify(senddata)
    })
    .then((Response)=>{
        console.log(Response)
        console.log(Response.data)
        // alert(Response.data.content[0].sessionId) 생성된 세션 아이디

        if(Response.data.content[0].sessionId != null){
            alert("제대로 생성!")
            if(window.location.href.includes("localhost") || window.location.href.includes("127.0.0.1")){
                window.location.href = "https://localhost:5000/src/Room/View.html?"+
                "session=" + Response.data.content[0].sessionId + "&username=" + sessionStorage.getItem("nickname")
                + "&userId=" + sessionStorage.getItem("userId") 
                + "&subject=" + subject + "&type=" + type + "&time=" + time + "&count=" + count + "&accessToken=" + sessionStorage.getItem("accessToken");
            }
            else{
                window.location.href = "https://localhost:5000/src/Room/View.html?"+
                "session=" + Response.data.content[0].sessionId + "&username=" + sessionStorage.getItem("nickname")
                + "&userId=" + sessionStorage.getItem("userId") 
                + "&subject=" + subject + "&type=" + type + "&time=" + time + "&count=" + count + "&accessToken=" + sessionStorage.getItem("accessToken");
            }
            console.log("https://corns.co.kr:4435/frontend/src/Room/View.html?"+
            "session=" + Response.data.content[0].sessionId + "&username=" + sessionStorage.getItem("nickname")
            + "&userId=" + sessionStorage.getItem("userId") 
            + "&subject=" + subject + "&type=" + type + "&time=" + time + "&count=" + count)
        }

    })
    .catch((Error)=>{console.log(Error)});



    /*
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
    */

}

export default MakeRoom;