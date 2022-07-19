/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from "preact";
import { Head } from "$fresh/runtime.ts";
import Topbar from "../components/topbar.tsx";
import Game, { Challenge } from "../islands/Game.tsx";
import { tw } from "@twind";

const startingDateSinceEpoch = 19192;
function today(): number {
  return Math.floor(Date.now()/8.64e7);
}

export default function Home() {
  const today = 0;
  const challenge = JSON.parse(Deno.readTextFileSync("data/000.json"))[today.toString()] as Challenge;
  console.log(challenge);

  return (
    <>
      <Head>
        <title>Gamedle</title>
        <link rel="stylesheet" href={`/main.css`} />
      </Head>
      <>
        <canvas id="background" class={tw`fixed`}></canvas>
        <Topbar today={today} />
        <Game challenge={challenge}/>
      </>
    </>
  );
}
