import React,{forwardRef} from "react";
import { Card, CardContent,Typography} from '@material-ui/core';
import  './messages.css';
// import ScrollToBottom from 'react-scroll-to-bottom';
var d = new Date(); 
var day = d.getDate; 
var month = d.getMonth; 
var year = d.getFullYear; 


const Messages = forwardRef(({username, message},ref)=> {
    // console.log(username)
    // console.log(message)
    const isUser = username === message.username;
    // const isUser= true;
  //   const messageHeader = ()=>{
  //     if(!isUser){
  //       `${message.username} to everyone:`
  //     }
  //     else{`You to everyone:`}
  //   }
  return (
    <div ref={ref} >
      <p className={isUser? "message-user-name":"message-guest-name"}>{isUser?`You to everyone:`:`${message.username} to everyone:`}</p>
      <Card className={isUser? "message-user":"message-guest"}  >
        
        <CardContent>
         
          <Typography className="user__message" color="grey" variant="h5" component="h2"> 
          {message.message}
          </Typography>
  {/* <p className={isUser? "message-user-dateTime":"message-guest-dateTime"}>{day}-{month}-{year}</p> */}
          
        </CardContent>
      </Card>
      

    </div>
  );
})

export default Messages;
