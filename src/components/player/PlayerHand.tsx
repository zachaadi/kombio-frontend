import { Box } from "@mui/material";
import backCard from "/backCard.svg";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { socket } from "../../app/socket";
import { useEffect } from "react";
import { getPlayers } from "./PlayerSlice";

import cardFlipped from "/cardFlipped.svg";
import negativeOneCard from "/negativeOneCard.svg";
import zeroCard from "/zeroCard.svg";
import oneCard from "/oneCard.svg";
import twoCard from "/twoCard.svg";
import threeCard from "/threeCard.svg";
import fourCard from "/fourCard.svg";
import fiveCard from "/fiveCard.svg";
import sixCard from "/sixCard.svg";
import sevenCard from "/sevenCard.svg";
import eightCard from "/eightCard.svg";
import nineCard from "/nineCard.svg";
import tenCard from "/tenCard.svg";
import eleven from "/elevenCard.svg";
import twelveCard from "/twelveCard.svg";
import thirteenCard from "/thirteenCard.svg";
import fourteenCard from "/fourteenCard.svg";

const PlayerHand = ({ name }: { name: string }) => {
  const players = useSelector((state: RootState) => state.player.players);
  const roomId = sessionStorage.getItem("roomId");
  const myName = sessionStorage.getItem("playerName");
  const playerHand = players.find((player) => player.name == name)?.hand;
  const isTurn = players.find((player) => player.name == name)?.isTurn || false;
  const dispatch = useDispatch();

  const handleFlip = (id: number) => {
    socket.emit("newAction", roomId, `${myName} flips card`);
    socket.emit("flipCard", roomId, myName, id, name);
  };

  const displayCard = (id: number) => {
    if (id == 1) return oneCard;
    if (id == 2) return oneCard;
    if (id == 3) return twoCard;
    if (id == 4) return twoCard;
    if (id == 5) return threeCard;
    if (id == 6) return threeCard;
    if (id == 7) return fourCard;
    if (id == 8) return fourCard;
    if (id == 9) return fiveCard;
    if (id == 10) return fiveCard;
    if (id == 11) return sixCard;
    if (id == 12) return sixCard;
    if (id == 13) return sevenCard;
    if (id == 14) return sevenCard;
    if (id == 15) return eightCard;
    if (id == 16) return eightCard;
    if (id == 17) return nineCard;
    if (id == 18) return nineCard;
    if (id == 19) return tenCard;
    if (id == 20) return tenCard;
    if (id == 21) return eleven;
    if (id == 22) return eleven;
    if (id == 23) return twelveCard;
    if (id == 24) return twelveCard;
    if (id == 25) return thirteenCard;
    if (id == 26) return thirteenCard;
    if (id == 27) return fourteenCard;
    if (id == 28) return fourteenCard;
    if (id == 29) return zeroCard;
    if (id == 30) return zeroCard;
    if (id == 31) return negativeOneCard;
    if (id == 32) return negativeOneCard;
    if (id == 33) return cardFlipped;
    return backCard;
  };

  useEffect(() => {
    socket.on("drawnCard", (players, drawnCard, name) => {
      dispatch(getPlayers(players));
      if (name == myName) {
        handleFlip(drawnCard);
      }
    });

    socket.on("flippedCard", (card, players) => {
      dispatch(getPlayers(players));
      console.log(card);
    });

    return () => {
      socket.off("flippedCard");
      socket.off("drawnCard");
    };
  }, [dispatch]);

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
            onClick={() => handleFlip(card.id)}
            sx={{ "&:hover": { transform: "scale(1.1)", cursor: "pointer" }, height: "5em" }}
            key={index}
            component={"img"}
            src={
              card.isFlipped == true && card.flippedBy == myName
                ? displayCard(card.id)
                : card.isFlipped == true && card.flippedBy != myName
                ? displayCard(33)
                : backCard
            }
          />
        ))}
      </Box>
    </Box>
  );
};

export default PlayerHand;
