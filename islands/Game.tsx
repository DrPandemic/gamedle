/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from "preact";
import { StateUpdater, useState } from "preact/hooks";
import { tw } from "@twind";
import Board from "./Board.tsx";
import Search from "./Search.tsx";
import Conclusion from "./Conclusion.tsx";

export enum GameState {
  Playing,
  Success,
  Failed,
}

export interface Hint {
  type: string;
  imageUrl: string;
  sx: number;
  sy: number;
  sWidth: number;
  sHeight: number;
}

export interface BuyLink {
  url: string;
  text?: string;
}

export interface Challenge {
  solution: string;
  description: string;
  descriptionSource: string;
  hints: Array<Hint>;
  buyLinks: Array<BuyLink>;
}

export interface Attempt {
  word: string;
}

export interface GameContext {
  word: string;
  setWord: StateUpdater<string>;
  challenge: Challenge;
  attempts: Array<Attempt>;
  pushAttempt: (a: Attempt) => void;
  gameState: GameState;
  setGameState: StateUpdater<GameState>;
}

interface GameProps {
  challenge: Challenge;
}

export default function Game(props: GameProps) {
  const [word, setWord] = useState("");
  const initialAttempts: Array<Attempt> = [];
  const [attempts, setAttempts] = useState(initialAttempts);
  const pushAttempt = (attempt: Attempt) => setAttempts([...attempts, attempt]);
  const [gameState, setGameState] = useState(GameState.Playing);

  // const Game: Context<GameContext> = createContext({
  const game: GameContext = {
    word, setWord,
    challenge: props.challenge,
    attempts, pushAttempt,
    gameState, setGameState,
  };

  let rendering = null;
  if (game.gameState !== GameState.Playing) {
    rendering = <>
      <Board game={game} />
      <Search game={game} />
    </>;
  } else {
    rendering = <Conclusion game={game}></Conclusion>
  }

  return (
    <div class={tw`mx-auto pt-5 h-full max-w-2xl w-full flex flex-col`} style="height: calc(100% - 68px)">
      {rendering}
    </div>
  );
}
