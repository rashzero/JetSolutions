export function shuffle(array) {
  const result = [...array];
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export const colors = ["green", "blue", "red", "yellow"];

export const difficultyList = ["low", "middle", "heigh"];

export const generateCardByDifficalty = (difficulty) => {
  const difficultyIndex = difficultyList.indexOf(difficulty);
  const difficultyValue = difficultyIndex + 2;
  const colorsSliced = colors.slice(0, difficultyValue);
  const colorsDuplicated = colorsSliced.concat(colorsSliced);
  const colortsShuffled = shuffle(colorsDuplicated);

  const cards = colortsShuffled.map((color, index) => ({
    color,
    id: index,
    isOpen: false
  }));
  return cards;
};
