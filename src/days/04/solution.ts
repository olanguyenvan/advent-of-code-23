import { parseInput } from "./parser";
import type { Card } from "./parser";

export function part1(input: string) {
  const parsed = parseInput(input);

  const result: number = getSum(parsed);

  console.log(`Solution to part 1 is ${result}`);
}

export function part2(input: string) {
  const parsed = parseInput(input);

  const result: number = getSumOfAllCards(parsed);

  console.log(`Solution to part 2 is ${result}`);
}

function getSum(cards: Card[]): number {
  let score = 0;

  for (const card of cards) {
    score += getScore(getMatchedNumbers(card).length);
  }

  return score;
}

type CardInfo = {
  quantity: number;
  card: Card;
};

function getSumOfAllCards(originalCards: Card[]): number {
  const cardsInfo: CardInfo[] = Array.from(
    Array(originalCards.length),
    (v, i) => {
      return {
        quantity: 1,
        card: originalCards[i],
      };
    }
  );

  for (let i = 0; i < cardsInfo.length; i++) {
    const cardInfo = cardsInfo[i];
    const matchedNumbersQuantity = getMatchedNumbers(cardInfo.card).length;

    for (let j = 1; j <= matchedNumbersQuantity; j++) {
      cardsInfo[i + j].quantity += cardInfo.quantity;
    }
  }

  let sum = 0;

  for (const cardInfo of cardsInfo) {
    sum += cardInfo.quantity;
  }

  return sum;
}

function getMatchedNumbers(card: Card): number[] {
  const { winningNumbers, scratchedNumbers } = card;

  return scratchedNumbers.filter((x) => winningNumbers.includes(x));
}

function getScore(matchedNumbers: number): number {
  if (matchedNumbers === 0) {
    return 0;
  }

  return Math.pow(2, matchedNumbers - 1);
}
