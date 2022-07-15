/** @jsx h */
import { Context, h, JSX } from "preact";
import { useContext, useState } from "preact/hooks";
import { tw } from "@twind";
import { GameContext } from "./Game.tsx";

interface SearchProps {
  searchTerm: string;
  game: Context<GameContext>;
}

export default function Search(props: SearchProps) {
  const [value, setSearchTerm] = useState(props.searchTerm);
  const game = useContext(props.game);

  function onSubmit(e: JSX.TargetedEvent<HTMLFormElement>) {
    game.pushAttempt({ word: game.word });
    e.preventDefault();
  }

  function onInput(e: JSX.TargetedEvent<HTMLInputElement>) {
    const { value } = e.currentTarget;
    game.setWord(value);
    setSearchTerm(value);
  }

  return (
    <form onSubmit={onSubmit}>
      <input type="text" value={value} onInput={onInput} />
      <button type="submit">Submit</button>
    </form>
  );
}

