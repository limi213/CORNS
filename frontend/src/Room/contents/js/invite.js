function dateFormat() {
    var date = new Date();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    month = month >= 10 ? month : '0' + month;
    day = day >= 10 ? day : '0' + day;
    hour = hour >= 10 ? hour : '0' + hour;
    minute = minute >= 10 ? minute : '0' + minute;
    second = second >= 10 ? second : '0' + second;

    return date.getFullYear() + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
}

function openInvite(){
    userId = document.getElementById("userId").value;
    jRoomNo = document.getElementById("jRoomNo").value;
	accessToken = document.getElementById("accessToken").value;

    if($("#friendList").css("display") == "none"){
        // div에 지금 친구 목록 불러오기
        $.ajax({
            type : "GET",
            url : serverUrl + "friend/" + userId + "?baseTime=" + dateFormat() + "&filter=0&page=0&size=1000", 
            headers: { "Content-Type": "application/json",
                        "Authorization" : "Basic " + accessToken,
                        "Access-Control-Allow-Credentials" : "true"},     
            contentType : "application/json",
            success: function(data, textStatus, xhr) {
                if(data.list != null && data.list != 'undefined'){
                    var f_list_html = ``;
                    for(var i = 0 ; i < data.list.length; i++){
                        var user = data.list[i];
                       f_list_html += `<li>
                           <img src="` + user.imgUrl +`" alt="user-image" />
                           <p>` + user.nickname + ` #` + user.userId + `</p>
                           <button onClick="inviteFriend(`+ user.userId +`)">초대하기</button>
                         </li>`;
                    }
    
                    $("#friendList > ul").html(f_list_html)
                    console.log("친구목록 불러오기 완료.");

                }
                else{
                    console.log("친구가 없습니다.");
                }
                
            },
            error:function(request,status,error){
                console.log("function openInvite Error")
                console.log(request);
                console.log(status);
                console.log(error);
            }
        });

        // 보이게
        $("#friendList").css("display","block");
    }
    else{
        // 안보이게
        $("#friendList").css("display","none");
    }
}

function inviteFriend(toUserId){
    var inviteData = {
        "fromUserId": userId,
        "roomNo": jRoomNo,
        "toUserId": toUserId
      };

    $.ajax({
        type : "POST",
        url : serverUrl + "/invitation",    
        headers: { "Content-Type": "application/json",
                    "Authorization" : "Basic " + accessToken,
                    "Access-Control-Allow-Credentials" : "true"},    
        contentType : "application/json",
        data : JSON.stringify(inviteData),
        success: function(data, textStatus, xhr) {
            
            console.log( JSON.stringify(inviteData))
            console.log(xhr)
            if(xhr.status === 200){
                alert("친구를 초대했습니다.");
            }
            else{
                alert("친구 초대에 실패했습니다.");
            }
            
        },
        error:function(request,status,error){
            alert("친구 초대에 실패했습니다.");
            console.log(request);
            console.log(status);
            console.log(error);
        }
    });
}