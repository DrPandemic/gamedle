/** @jsx h */
import { Context, h } from "preact";
import { useContext } from "preact/hooks";
import { tw } from "@twind";
import { GameContext } from "./Game.tsx";

interface BoardProps {
  game: Context<GameContext>;
}

export default function Board(props: BoardProps) {
  const game = useContext(props.game);
  return (
    <div>
      { game.currentChallenge.hints.slice(0, game.attempts.length + 1).map((hint) =>
          <img src={hint.image} />
        )
      }
    </div>
  );
}


