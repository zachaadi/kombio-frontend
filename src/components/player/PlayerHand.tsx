import { useEffect } from "react";
import { Box } from "@mui/material";
import backCard from "/back-card.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { socket } from "../../app/socket";

const PlayerHand = ({ name }: { name: string }) => {
  const players = useSelector((state: RootState) => state.player.players);
  const dispatch = useDispatch();
  const roomId = sessionStorage.getItem("roomId");

  const playerHand = players.find((player) => player.name == name)?.hand;

  const handleView = (index: number) => {
    socket.emit("viewCard", roomId, name, index);
  };

  useEffect(() => {
    socket.on("viewedCard", (card) => {
      console.log(card);
    });

    return () => {
      socket.off("viewedCard");
    };
  }, [roomId]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box>{name}</Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateRows: "repeat(2, auto)",
          gridAutoFlow: "column",
          gridAutoColumns: "auto",
          width: "fit-content",
        }}
      >
        {playerHand?.map((card, index) => (
          <Box
            onClick={() => handleView(index)}
            sx={{ "&:hover": { transform: "scale(1.1)" } }}
            key={index}
            component={"img"}
            src={backCard}
          />
        ))}
      </Box>
    </Box>
  );
};

export default PlayerHand;
