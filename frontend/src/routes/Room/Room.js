/** @jsxImportSource @emotion/react */

function Room(props) {
   //params 에 담긴 항목 가져오기 
  const searchParams = props.location.search;
  
   //obj에 URLSearchParams를 사용해 담아준다. 기본값은 {}가 나온다
  const obj = new URLSearchParams(searchParams);
   //name으로 검색된 value 값을 가져오기 위해 get을 사용해준다
  const session = obj.get("session");
  // const url1 = "http://i8a506.p.ssafy.io:3028/frontend/src/Room/View.html?session=" + session;
  const url1 = "https://corns.co.kr:4435/frontend/src/Room/View.html?session=" + session;
  const url2 = "http://localhost:5500/src/Room/View.html?session=" + session;
  //alert(window.location.href.includes("localhost"))  
  if(window.location.href.includes("localhost")){
      return (
        <iframe allow='camera *;microphone *'
        src={url2}
        id="roomOpenviduID"
        title="Frame test"
        // remove these styles later
        frameBorder='0' 
        style={{ minHeight: '100vh', width: '100vw', border: '0px', display: 'block' }}
      />
    );
    }
    else{
      return (
        <iframe allow='camera *;microphone *'
        src={url1}
        id="roomOpenviduID"
        title="Frame test"
        // remove these styles later
        frameBorder='0'
        style={{ minHeight: '100vh', width: '100vw', border: '0px', display: 'block' }}
      />
    );

    }
  
  }
  
export default Room;
