/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

interface TopbarProps {
  today: number;
}

export default function Topbar(props: TopbarProps) {
  return (
    <nav class={tw`bg-white border-b border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900`}>
      <div class={tw`container flex flex-wrap justify-between items-center mx-auto`}>
        <a target="_blank" href="https://github.com/DrPandemic/gamedle"><img src="information.svg" alt="information" class={tw`w-5 cursor-pointer`}></img></a>
        <span class={tw`items-center`}>
          <a href="./" class={tw`self-center text-xl font-semibold whitespace-nowrap dark:text-white`}>Gamedle - #{props.today}</a>
        </span>
        <img src="color-adjust.svg" alt="information" class={tw`w-5 cursor-pointer`}></img>
      </div>
    </nav>
  );
}
