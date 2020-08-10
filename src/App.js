import React from "react";
import "./App.css";
import {
  Button,
  TextField,
  FormControl,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Messages from "./Messages";
import db from "./firebase";
import firebase from "firebase";
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";
import "./emoji.css";
import FlipMove from "react-flip-move";
import SelectInput from "@material-ui/core/Select/SelectInput";
import SendIcon from "@material-ui/icons/Send";
import MicIcon from "@material-ui/icons/Mic";
// import ReactAutoScroll from 'react-to-target-auto-scroll';
// import { animateScroll } from "react-scroll";
import ScrollToBottom from "react-scroll-to-bottom";
import SentimentSatisfiedTwoToneIcon from "@material-ui/icons/SentimentSatisfiedTwoTone";

function App() {
  const [input, setInput] = React.useState("");
  const [messages, setMessages] = React.useState([
    { id: 2, message: { message: "Happy Chatting!!", username: "LetsChat" } },
  ]);
  const [username, setUsername] = React.useState("");
  const [chosenEmoji, setChosenEmoji] = React.useState(null);
  const sendMessage = (event) => {
    event.preventDefault();
    db.collection("messages").add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    // setMessages([...messages, { username: username, message: input }]);
    setInput("");
  };

  React.useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);

  const nameList = [
    "Willard",
    "Sadie",
    "Ashley",
    "Nelson",
    "Hadden",
    "Darshana",
    "Indu",
    "Pushpa",
    "Balasubramanian",
  ];
  React.useEffect(() => {
    var name = prompt(
      "Hey! Please enter your username...else we will give you a name of our choice"
    );
    if (name === "") {
      setUsername(nameList[Math.floor(Math.random() * nameList.length)]);
    } else {
      setUsername(name);
    }
    console.log(name);
  }, []);
  const emojiContainer = () => {
    var x = document.querySelector(".emojiContainer");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  };

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };

  React.useEffect(() => {
    if (chosenEmoji != null) {
      setInput(input + chosenEmoji.emoji);
    }
  }, [chosenEmoji]);

  // Mic part

  return (
    <div className="App">
      <AppBar position="static" className="appBar">
        <Toolbar className="appToolBar">
          <Typography variant="h6">LetsChat</Typography>
          <Typography variant="h6">Welcome {username}</Typography>
          <Typography variant="h6">Made with 💖 by Shudhanshu</Typography>
        </Toolbar>
      </AppBar>

      <form className="app__form">
        <FormControl className="app__FormControl">
          <TextField
            className="app__input"
            id="standard-basic"
            label="Type..."
            value={input}
            // onChange={(event) => setInput(event.target.value + chosenEmoji)}
            onChange={(event) => setInput(event.target.value)}
          />
          <IconButton color="secondary" onClick={emojiContainer}>
            <SentimentSatisfiedTwoToneIcon className="emojiPicker" />
          </IconButton>
          <IconButton
            className="app__iconButton"
            type="submit"
            variant="contained"
            color="primary"
            disabled={!input}
            onClick={sendMessage}
          >
            <SendIcon className="sendIcon" />
          </IconButton>
        </FormControl>
      </form>

      <div className="messages">
        <FlipMove>
          {messages.map(({ id, message }) => (
            <Messages key={id} username={username} message={message} />
          ))}
        </FlipMove>
      </div>
      <div className="emojiContainer" id="mydiv">
        <Picker
          onEmojiClick={onEmojiClick}
          disableAutoFocus={true}
          groupNames={{ smileys_people: "PEOPLE" }}
        />
      </div>
    </div>
  );
}

export default App;
