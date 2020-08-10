import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16)
    }
  }
}));

export default function Card({ handleChangeCard, card }) {
  const classes = useStyles();
  const { color, isOpen } = card;

  return (
    <div className={classes.root}>
      <Paper
        elevation={3}
        style={{
          background: isOpen ? color : "#b3b3b3"
        }}
        onClick={() => handleChangeCard(card)}
      />
    </div>
  );
}
