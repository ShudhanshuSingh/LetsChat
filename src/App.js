import React from "react";
import "./App.css";
import { Button, TextField, FormControl } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Messages from "./Messages";
import db from "./firebase";
import firebase from "firebase";
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";
import "./emoji.css";
import FlipMove from "react-flip-move";
import SelectInput from "@material-ui/core/Select/SelectInput";
function App() {
  const [input, setInput] = React.useState("");
  const [messages, setMessages] = React.useState([{id:2,message:{message:"Hello", username:"SHudh"}}]);
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
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map(doc => ({id:doc.id, message:doc.data()})));
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
    var name = prompt("Hey! Please enter your username...else we will give you a name of our choice");
    if (name === "") {
      setUsername(nameList[Math.floor(Math.random() * nameList.length)]);
    } else {
      setUsername(name);
    }
    console.log(name);

    // setUsername(prompt("Hey! Please enter your username..."));
  }, []);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
    // setInput(input + emojiObject.emoji);
    console.log(emojiObject.emoji);
    setInput(input + emojiObject.emoji);
  };

  return (
    <div className="App">
      <h2>LetsChat!! 🐱‍🏍</h2>
      <h2>Welcome {username}🐱‍🏍</h2>
      <FormControl>
        <TextField
          id="standard-basic"
          label="Type..."
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          disabled={!input}
          onClick={sendMessage}
        >
          send
        </Button>
        <Picker
          className="emojiContainer"
          onEmojiClick={onEmojiClick}
          disableAutoFocus={true}
          groupNames={{ smileys_people: "PEOPLE" }}
        />
      </FormControl>

      <FlipMove>
        {messages.map(({id,message}) => (
          <Messages key={id} username={username} message={message} />
          // <p>{message}</p>
        ))}
      </FlipMove>
    </div>
  );
}

export default App;
