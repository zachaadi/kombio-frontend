// import React from 'react'
import { Box, List, ListItem, Typography, Paper } from "@mui/material";
import { useEffect, useRef } from "react";
import { socket } from "../../app/socket";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { setAction } from "./GameSlice";

const ActionsBox = ({ roomId }: { roomId: string }) => {
  const actions = useSelector((state: RootState) => state.game.game?.actions || []);
  const dispatch = useDispatch();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [actions]);

  useEffect(() => {
    const handleAction = (actionList: string[]) => {
      dispatch(setAction(actionList));
    };

    socket.on("actionList", (actionList) => {
      handleAction(actionList);
    });

    socket.emit("getActions", roomId);

    return () => {
      socket.off("actionList");
    };
  }, [roomId]);

  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
      <Box>
        <Typography
          sx={{
            fontWeight: 700,
            pt: "1em",
          }}
          variant="h6"
        >
          Action box
        </Typography>
        <Paper
          sx={{
            minWidth: "20vw",
            height: "15vh",
            overflowY: "auto",
          }}
        >
          <List>
            {actions.map((act, index) => (
              <ListItem key={index}>
                <i>{act}</i>
              </ListItem>
            ))}
          </List>
          <div ref={messagesEndRef} />
        </Paper>
      </Box>
    </Box>
  );
};

export default ActionsBox;
