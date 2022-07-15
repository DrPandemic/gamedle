/** @jsx h */
import { Context, createContext, h, JSX } from "preact";
import { StateUpdater, useContext, useState } from "preact/hooks";
import { tw } from "@twind";
import Board from "./Board.tsx";
import Search from "./Search.tsx";

export interface Hint {
    image: string;
}

export interface Challenge {
    hints: Array<Hint>;
}

export interface Attempt {
  word: string;
}

export interface GameContext {
  word: string;
  setWord: StateUpdater<string>;
  currentChallenge: Challenge;
  attempts: Array<Attempt>;
  pushAttempt: (a: Attempt) => void;
}

export default function Game() {
  const [word, setWord] = useState("");
  const hints = [
    { image: "https://avatars.githubusercontent.com/u/3250155?v=4" },
    { image: "https://avatars.githubusercontent.com/u/46688056?s=200&v=4" },
  ];
  const initialAttempts: Array<Attempt> = [];
  const [attempts, setAttempts] = useState(initialAttempts);
  const pushAttempt = (attempt: Attempt) => setAttempts([...attempts, attempt]);

  const Game: Context<GameContext> = createContext({ word, setWord, currentChallenge: { hints }, attempts, pushAttempt });

  return (
    <span>
      <Board game={Game} />
      <Search searchTerm="" game={Game} />
    </span>
  );
}
