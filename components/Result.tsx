/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from "preact";
import { tw } from "@twind";
import { GameContext, GameState } from "../islands/Game.tsx";

interface ResultProps {
  game: GameContext;
}

function copyResult() {
  navigator.clipboard.writeText(text).then(function () {
    console.log('Async: Copying to clipboard was successful!');
  }, function (err) {
    console.error('Async: Could not copy text: ', err);
  });
}

export default function (props: ResultProps) {
  const failed = 3;
  const won = props.game.gameState == GameState.Success;
  let hearts = "";

  Array(failed - 1).fill(0).forEach(() => {
    hearts += "🤍";
  });
  if (won) {
    hearts += "💚";
  } else {
    hearts += "🤍";
  }
  Array(props.game.challenge.hints.length - failed).fill(0).map(() => {
    hearts += "❤";
  });

  return (
    <div class={tw`flex flex-row justify-center items-center mt-5`}>
      <span class={tw`mr-5`}>
        {hearts}
      </span>
      <span>
        <button class={tw`block text-center cursor-pointer bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline`}>
          Share Results
        </button>
      </span>
    </div>
  );
}
