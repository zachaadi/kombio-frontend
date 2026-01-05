import { Box } from "@mui/material";
import backCard from "/backCard.svg";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { socket } from "../../app/socket";
import { useEffect } from "react";
import { getPlayers } from "./PlayerSlice";

const PlayerHand = ({ name }: { name: string }) => {
  const players = useSelector((state: RootState) => state.player.players);
  const roomId = sessionStorage.getItem("roomId");
  const playerHand = players.find((player) => player.name == name)?.hand;
  const isTurn = players.find((player) => player.name == name)?.isTurn || false;
  const dispatch = useDispatch();

  const handleView = (index: number) => {
    socket.emit("viewCard", roomId, name, index);
  };

  useEffect(() => {
    // socket.on("flippedCard", (card, name) => {
    //   console.log(card);
    // });

    socket.on("drawnCard", (players) => {
      dispatch(getPlayers(players));
    });

    return () => {
      // socket.off("flippedCard");
      socket.off("drawnCard");
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
      <Box sx={{ border: isTurn ? "2px solid blue" : "", borderRadius: "5px" }}>{name}</Box>

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
            sx={{ "&:hover": { transform: "scale(1.1)", cursor: "pointer" }, height: "5em" }}
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
