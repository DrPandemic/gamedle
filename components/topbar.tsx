/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

export default function Topbar() {
  return (
    <nav class={tw`bg-white border-b border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900`}>
      <div class={tw`container flex flex-wrap justify-between items-center mx-auto`}>
        <span class={tw`items-center`}>Info</span>
        <span class={tw`items-center`}>
          <a href="./" class={tw`self-center text-xl font-semibold whitespace-nowrap dark:text-white`}>Gamedle</a>
        </span>
        <span class={tw`items-center`}>Dark mode</span>
      </div>
    </nav>
  );
}

