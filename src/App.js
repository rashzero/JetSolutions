import React from "react";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Card from "./components/Card";
import Grid from "@material-ui/core/Grid";
import DialogSuccess from "./components/DialogSuccess";
import { difficultyList, generateCardByDifficalty } from "./utils";
import TextField from "@material-ui/core/TextField";

export default class App extends React.Component {
  state = {
    difficulty: "",
    cards: [],
    selectedCard: null
  };

  get isGameOver() {
    const { cards } = this.state;
    return cards.length > 0 && cards.every(({ isOpen }) => isOpen);
  }

  difficyltyChangeHandler = (event) => {
    const difficulty = event.target.value;
    const cards = generateCardByDifficalty(difficulty);
    this.setState({
      difficulty,
      cards
    });
  };

  flipBack = (card) => {
    const { selectedCard, cards } = this.state;
    const cardsCloned = [...cards];

    const cardsChanged = cardsCloned.map((cardCloned) => {
      if (cardCloned.id === card.id) {
        cardCloned.isOpen = !cardCloned.isOpen;
      }
      return cardCloned;
    });

    this.setState({
      cards: cardsChanged,
      selectedCard: selectedCard ? null : card
    });
  };

  handleChangeCard = (card) => {
    const { selectedCard } = this.state;

    if (selectedCard && selectedCard.color !== card.color) {
      this.flipBack(selectedCard);
    } else {
      this.flipBack(card);
    }
  };

  resetGame = () => {
    this.setState({
      difficulty: "",
      cards: [],
      selectedCard: null
    });
  };

  render() {
    return (
      <Grid container justify="center">
        <Grid item xs={12}>
          <Typography align="center">Game</Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            select
            fullWidth
            label="Difficulty"
            value={this.state.difficulty}
            onChange={this.difficyltyChangeHandler}
            helperText="Please select your difficulty"
            variant="outlined"
          >
            {difficultyList.map((difficulty) => (
              <MenuItem key={difficulty} value={difficulty}>
                {difficulty}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid container justify="center">
          {this.state.cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              handleChangeCard={this.handleChangeCard}
              matchedCards={this.state.matchedCards}
            />
          ))}
        </Grid>
        {this.isGameOver && <DialogSuccess resetGame={this.resetGame} />}
      </Grid>
    );
  }
}
