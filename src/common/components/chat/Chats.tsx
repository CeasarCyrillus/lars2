import {Avatar, Box, Card, Divider, Paper, Stack, Typography} from "@mui/material"
import React from "react";

const comments = [
  {
    id: 1,
    from: "ceasar cyrillus",
    comment: "lorum ipsum loasdp lamsdlmk a aasdklm asd asd, lorum ipsum loasdp lamsdlmk a aasdklm asd asd, lorum ipsum loasdp lamsdlmk a aasdklm asd asd"
  },
  {id: 2, from: "Anna Berg Stal", comment: "lorum ipsum loasdp lamsdlmk a aasdklm asd asd"}
]


const Chats = () => {
  return <Paper variant={"outlined"} sx={{flexGrow: 1, padding: "5px"}}>
    <Typography><b>Chat</b></Typography>
    <Divider/>
    <Stack sx={{marginTop: "10px"}}>
      {comments.map((comment) => <Chat key={comment.id} {...comment}/>)}
    </Stack>
  </Paper>
}

type ChatProps = {
  from: string
  comment: string
}
const Chat = ({from, comment}: ChatProps) => {
  const isMe = from === "ceasar cyrillus"
  return <Card
    elevation={1}
    sx={{
      margin: "3px",
      backgroundColor: isMe ? "PowderBlue" : "WhiteSmoke",
      alignSelf: isMe ? "flex-end" : "flex-start",
      maxWidth: "200px",
    }}
  >
    <Box>
      <Box sx={{
        margin: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: "10px"
      }}>
        <Avatar
          src={`https://ui-avatars.com/api/?background=random&name=${from}`}
          sx={{width: 30, height: 30}}
        />
        <Typography><b>{from}</b></Typography>
      </Box>
      <Divider/>
      <Box sx={{margin: 1}}>
        <Typography>{comment}</Typography>
      </Box>
    </Box>
  </Card>
}