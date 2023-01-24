import Navbar from "../components/Navbar";
import LogInUserArea from "../components/Conversation/LogInUserArea";
import AnonymousUserArea from "../components/Conversation/AnonymousUserArea";
import RoomList from "../components/Conversation/RoomList";
import AddBtn from "../components/Conversation/AddBtn";

function Conversation() {
  const user = true;
  return (
    <>
      <Navbar />
      {user ? <LogInUserArea /> : <AnonymousUserArea />}
      <RoomList />
      <AddBtn />
    </>
  );
}

export default Conversation;
