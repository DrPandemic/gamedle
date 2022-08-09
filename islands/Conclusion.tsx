/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h, Component, createRef } from "preact";
import { useEffect } from "preact/hooks";
import { tw } from "@twind";
import { GameContext, GameState } from "./Game.tsx";
import ImageCanvas from "../components/ImageCanvas.tsx";
import ConfettiGenerator from "confetti-js";
import Carousel from "../components/Carousel.tsx";
import Result from "../components/Result.tsx";

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

  getAttemptWord(index: number): string {
    if (index >= this.props.game.attempts.length) {
      return "\u200b";
    }
    return this.props.game.attempts[index].word || "\u200b";
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
    if (this.props.game.gameState === GameState.Success) {
      text = <>Congrats 🎉</>;
      useEffect(() => {
        const confettiSettings = { target: "background", respawn: false, speed: 120, rotate: true };
        // @ts-ignore: noImplicitAny
        const confetti = new ConfettiGenerator(confettiSettings);
        confetti.render();

        return () => confetti.clear();
      }, []);
    } else {
      text = <>Nope, you failed 😢</>;
    }

    return (
      <div ref={this.containerRef} class={tw`mx-5`}>
        <div class={tw`font-semibold text-center text-3xl`}>{text}<br/>The game was {this.props.game.challenge.solution}</div>
        <div class={tw`flex flex-row justify-center`}>
          <Carousel>
            {this.props.game.challenge.hints.map((hint, index) =>
              <div class={tw`p-3 h-full flex flex-col`}>
                <div class={tw`font-semibold text-center`}>{this.getAttemptWord(index)}</div>
                <ImageCanvas key={`image-conclusion-${index}`} hint={hint} width={imageSize} height={imageSize}></ImageCanvas>
              </div>
            )
            }
          </Carousel>
        </div>
        <Result game={this.props.game}></Result>
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

