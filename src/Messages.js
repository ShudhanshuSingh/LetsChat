import React,{forwardRef} from "react";
import { Card, CardContent,Typography} from '@material-ui/core';
import  './messages.css';

const Messages = forwardRef(({username, message},ref)=> {
    console.log(username)
    console.log(message)
    const isUser = username === message.username;
    // const isUser= true;
  return (
    <div ref={ref}>
      <Card className={isUser? "message-user":"message-guest"} >
        <CardContent>
          <Typography className="user__name"  variant="h5" component="h4"> 
          {message.username}
          </Typography>
          <hr></hr>
          <Typography className="user__message" color="grey" variant="h5" component="h2"> 
          {message.message}
          </Typography>
          {/* <Typography color="grey" variant="h5" component="h2"> 
          {message.username}:{message.message}
          </Typography> */}
        </CardContent>
      </Card>
    </div>
  );
})

export default Messages;
