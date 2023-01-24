import Navbar from "../../components/Navbar";
import LogInUserArea from "./LogInUserArea";
import AnonymousUserArea from "./AnonymousUserArea";
import RoomList from "./RoomList";

function Conversation() {
  const user = true;
  return (
    <>
      <Navbar />
      {user ? <LogInUserArea /> : <AnonymousUserArea />}
      <RoomList />
    </>
  );
}

export default Conversation;
