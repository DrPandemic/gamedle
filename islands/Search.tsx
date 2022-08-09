/** @jsx h */
import { Context, h, JSX } from "preact";
import { useContext, useState } from "preact/hooks";
import { tw } from "@twind";
import { GameContext, GameState } from "./Game.tsx";

interface SearchProps {
  game: GameContext;
}

export default function Search(props: SearchProps) {
  const [value, setSearchTerm] = useState("");
  const game = props.game;

  const remaining = game.challenge.hints.length - game.attempts.length;

  let text = "";
  if (remaining === 0) {
    text = "Done";
  } else {
    text = `${remaining} ${remaining > 1 ? "guesses" : "guess" } remaining`;
  }

  function onSubmit(e: JSX.TargetedEvent<HTMLFormElement>) {
    e.preventDefault();
    if (game.word === "") {
      return;
    }

    game.pushAttempt({ word: game.word });
    game.setWord("");
    setSearchTerm("");

    if (match(game.word, game.challenge.solution)) {
      game.setGameState(GameState.Success);
      return;
    }

    if (game.attempts.length === game.challenge.hints.length - 1) {
      game.setGameState(GameState.Failed);
    }
  }

  function onInput(e: JSX.TargetedEvent<HTMLInputElement>) {
    const { value } = e.currentTarget;
    game.setWord(value);
    setSearchTerm(value);
  }

  return (
    <div class={tw`flex flex-col items-center`}>
      <form onSubmit={onSubmit} class={tw`items-center justify-center pt-5 w-full flex`}>
        <input
          class={tw`shadow border rounded py-2 px-3 ml-6 mr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full`}
          id="attempt" type="text" placeholder="What's this game?" autocomplete="off"
          value={value} onInput={onInput} />
        <button type="submit" class={tw`bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-3 mr-6 rounded focus:outline-none focus:shadow-outline`}>Guess</button>
      </form>
      <div class={tw`text-gray-500`}>{text}</div>
    </div>
  );
}

function normalize(word: string): string {
  return word.replace(/[^a-zA-Z0-9]/g, "").toLocaleLowerCase();
}

function match(a: string, b: string): boolean {
  return normalize(a) === normalize(b);
}
