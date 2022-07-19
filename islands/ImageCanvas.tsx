/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, Component, Context, createRef, h } from "preact";
import { useContext } from "preact/hooks";
import { tw } from "@twind";
import { Hint } from "./Game.tsx";

interface ImageCanvasProps {
  hint: Hint;
  width?: number;
  height?: number;
}

export default class ImageCanvas extends Component<ImageCanvasProps> {
  ref = createRef();
  state = {
    loadedImage: null,
  }

  componentDidMount() {
    const canvas = (this.ref.current as HTMLCanvasElement);
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    this.resizeCanvas();

    const image = new Image();
    image.src = this.props.hint.imageUrl;

    image.onload = () => {
      this.setState(() => ({loadedImage: image}));
    }
  }

  componentDidUpdate() {
    if (this.state.loadedImage) {
      const canvas = (this.ref.current as HTMLCanvasElement);
      if (!this.ref.current) {
        return;
      }
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        return;
      }
      ctx.drawImage(this.state.loadedImage, this.props.hint.sx, this.props.hint.sy, this.props.hint.sWidth, this.props.hint.sHeight, 0, 0, canvas.width, canvas.height);
    }
  }

  resizeCanvas() {
    const canvas = (this.ref.current as HTMLCanvasElement);
    if (!this.ref.current) {
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    canvas.width = this.props.width || 200;
    canvas.height = this.props.height || 200;
  }



  render() {
    this.resizeCanvas();
    return (
      <>
        <canvas ref={this.ref}></canvas>
      </>
    );
  }
}
