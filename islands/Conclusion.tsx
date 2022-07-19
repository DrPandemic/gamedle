/** @jsx h */
/** @jsxFrag Fragment */
import { Context, Fragment, createContext, h, JSX, Component, createRef } from "preact";
import { useContext, useEffect, useState } from "preact/hooks";
import { tw } from "@twind";
import { GameContext, GameState } from "./Game.tsx";
import ImageCanvas from "./ImageCanvas.tsx";
import ConfettiGenerator from "confetti-js";

interface ConclusionProps {
  game: GameContext;
}

export default class Conclusion extends Component<ConclusionProps> {
  containerRef = createRef();
  state = {
    width: 0,
    height: 0,
  };

  componentDidMount() {
    this.setState(() => ({
      width: (this.containerRef.current as HTMLDivElement).offsetWidth,
      height: (this.containerRef.current as HTMLDivElement).offsetHeight,
    }));
  }

  render() {
    const onResize = () => {
      this.setState(() => ({
        width: (this.containerRef.current as HTMLDivElement).offsetWidth,
        height: (this.containerRef.current as HTMLDivElement).offsetHeight,
      }));
    }
    useEffect(() => {
      addEventListener("resize", onResize);
      return () => removeEventListener("resize", onResize);
    }, []);

    const imageSize = Math.min(this.state.width, this.state.height) / 5;

    let text;
    if (this.props.game.gameState == GameState.Failed) {
      text = <>Nope, you failed 😢</>;
    } else {
      text = <>Congrats 🎉</>;
      useEffect(() => {
        const confettiSettings = { target: "background", respawn: false, speed: 120, rotate: true };
        // @ts-ignore: noImplicitAny
        const confetti = new ConfettiGenerator(confettiSettings);
        confetti.render();

        return () => confetti.clear();
      }, [])
    }

    return (
      <div ref={this.containerRef} class={tw`mx-5`}>
        <div class={tw`font-semibold mb-3 text-center text-3xl`}>{text}<br/>The game was {this.props.game.challenge.solution}</div>
        <div class={tw`flex flex-row justify-center`}>
          { this.props.game.challenge.hints.slice(0, this.props.game.attempts.length).map((hint, index) =>
            <div class={tw`p-3`}>
              <div class={tw`font-semibold text-center`}>{this.props.game.attempts[index].word || "\u200b"}</div>
              <ImageCanvas key={`image-conclusion-${index}`} hint={hint} width={imageSize} height={imageSize}></ImageCanvas>
            </div>
            )
          }
        </div>
        <img src={this.props.game.challenge.imageUrl}></img>
        <div class={tw`font-semibold mt-5`}>{this.props.game.challenge.description}</div>
        <div><a class={tw`text-blue-500`} href={this.props.game.challenge.descriptionSource}>Source</a></div>
        <div class={tw`my-3 w-full`}>
          { this.props.game.challenge.buyLinks.map((link) =>
            <a href={link.url} class={tw`w-full block text-center cursor-pointer mt-5 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline`}>
              { link.text || "Get this game 🎮" }
            </a>
          )}
        </div>
      </div>
    );
  }
}

