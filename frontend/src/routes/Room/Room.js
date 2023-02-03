/** @jsxImportSource @emotion/react */

function Room() {
    window.sessionStorage.setItem("userName", JSON.stringify("gdgd"));
    return (
        <iframe
        src="http://localhost:5500/src/Room/View.html"
        // src="http://i8a506.p.ssafy.io:3028/frontend/src/Room/View.html"
        id="unique-id"
        title="Frame test"
        // remove these styles later
        style={{ minHeight: `100vh`, width: '100vw' }}
      />
    );
  }
  
export default Room;
