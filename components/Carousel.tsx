/** @jsx h */
/** @jsxFrag Fragment */
import { Context, Fragment, createContext, h, JSX, ComponentChildren, toChildArray } from "preact";
import { StateUpdater, useContext, useState } from "preact/hooks";
import { tw } from "@twind";
import ImageCanvas from "./ImageCanvas.tsx";

interface CarouselProps {
  children: ComponentChildren;
}

export default function (props: CarouselProps) {
  const children = toChildArray(props.children);
  const [currentIndex, setCurrentIndex] = useState(0);
  const increment = () => setCurrentIndex(currentIndex + 1 >= children.length ? 0 : currentIndex + 1);
  const decrement = () => setCurrentIndex(currentIndex - 1 < 0 ? children.length - 1 : currentIndex - 1);

  return (
    <div class={tw`grid place-items-center w-full`}>
      <div class={tw`w-full max-w-screen-md h-80 relative overflow-hidden rounded`}>
        {children.map((image, index) =>
          <div class="slide" style={{ transform: `translateX(${(index - currentIndex) * 100}%)` }}>{image}</div>
        )}

        <button class="btn btn-next" onClick={increment}>&gt;</button>
        <button class="btn btn-prev" onClick={decrement}>&lt;</button>
      </div>
    </div>
  );
}
