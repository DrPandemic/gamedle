/** @jsx h */
import { Component, Context, createRef, h } from "preact";
import { useContext, useEffect, useState } from "preact/hooks";
import { tw } from "@twind";
import { GameContext } from "./Game.tsx";
import ImageCanvas from "../components/ImageCanvas.tsx";

interface BoardProps {
  game: GameContext;
}

export default class Board extends Component<BoardProps> {
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
    const game = this.props.game;
    const currentIndex = game.attempts.length != game.challenge.hints.length ? game.attempts.length : game.attempts.length -1;
    const currentHint = game.challenge.hints[currentIndex];

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

    const imageSize = Math.min(this.state.width, this.state.height) / 4 * 3;

    return (
      <div ref={this.containerRef} class={tw`flex flex-col justify-center items-center h-full`}>
        <div class={tw`flex flex-row justify-center`}>
          { game.challenge.hints.slice(0, currentIndex).map((hint, index) =>
            <div class={tw`p-3`}>
              <div class={tw`font-semibold text-center`}>{game.attempts[index].word || "\u200b"}</div>
              <ImageCanvas key={`image-${index}`} hint={hint} width={imageSize / 4} height={imageSize / 4}></ImageCanvas>
            </div>
            )
          }
        </div>
        <div class={tw``}>
          <ImageCanvas key={`image-${currentIndex}`} hint={currentHint} width={imageSize} height={imageSize}></ImageCanvas>
        </div>
      </div>
    );
  }
}
