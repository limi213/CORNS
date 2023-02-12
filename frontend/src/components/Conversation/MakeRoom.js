// import React from 'react';
import axios from "axios";
// axios.defaults.withCredentials = true; // withCredentials 전역 설정

const MakeRoom = async (subject, type, time, count= false) => {

    if(window.location.href.includes("localhost") || window.location.href.includes("127.0.0.1")){
        window.location.href = "https://localhost:5000/src/Room/GoToView.html?"+
        // "session=" + Response.data.content[0].sessionId + "&" + 
        "username=" + sessionStorage.getItem("nickname")
        + "&userId=" + sessionStorage.getItem("userId") 
        + "&subject=" + subject + "&type=" + type + "&time=" + time + "&count=" + count + "&accessToken=" + sessionStorage.getItem("accessToken");
    }
    else{
        window.location.href = "https://corns.co.kr:4435/frontend/src/Room/GoToView.html?"+
        // "session=" + Response.data.content[0].sessionId + "&" + 
        "username=" + sessionStorage.getItem("nickname")
        + "&userId=" + sessionStorage.getItem("userId") 
        + "&subject=" + subject + "&type=" + type + "&time=" + time + "&count=" + count + "&accessToken=" + sessionStorage.getItem("accessToken");
    }

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