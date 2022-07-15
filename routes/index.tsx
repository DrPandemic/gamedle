/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import Topbar from "../components/topbar.tsx";
import Game from "../islands/Game.tsx";

export default function Home() {
  return (
    <span>
      <Topbar />
      <Game />
    </span>
  );
}
