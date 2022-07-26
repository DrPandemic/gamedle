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

const challengeContent = await Deno.readTextFile("data/000.json");

export default function Home() {
  const today = 0;
  const challenge = JSON.parse(challengeContent)[today.toString()] as Challenge;

  return (
    <>
      <Head>
        <title>Gamedle</title>
        <link rel="stylesheet" href={`/main.css`} />
      </Head>
      <>
        <canvas id="background" class={tw`fixed`} style="z-index: -1"></canvas>
        <Topbar today={today} />
        <Game challenge={challenge}/>
      </>
    </>
  );
}
