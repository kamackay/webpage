import * as React from "react";
import { randomInt, remove } from "src/utils";
import "../../index.css";
import KeithProps from "../../model/KeithProps";
import KeithState from "../../model/KeithState";
import KeithComponent from "./KeithComponent";

interface TypingProps extends KeithProps {
  items: string[];
  delay: number;
  font?: string;
  color?: string;
}

interface TypingState extends KeithState {
  cursorShowing: boolean;
  currentItem: string;
  currentIndex: number;
  action: "incrementing" | "decrementing" | "waiting";
  waitTime: number;
}

const randomFactor = () => Math.random() * 0.5 + 0.5;

export default class TypingComponent extends KeithComponent<
  TypingProps,
  TypingState
> {
  private intervals: NodeJS.Timeout[] = [];
  private updateTime = 450;
  private cursorFlashTime = 500;

  constructor(props: TypingProps) {
    super(props);
    this.state = {
      cursorShowing: false,
      currentItem: props.items[randomInt(0, props.items.length - 1)],
      currentIndex: 0,
      action: "incrementing",
      waitTime: 0,
    };
  }

  public componentWillUnmount() {
    this.intervals.forEach((i) => {
      try {
        clearInterval(i);
      } catch (err) {
        console.error(err);
      }
    });
  }

  public componentDidMount() {
    const update = () => {
      switch (this.state.action) {
        case "incrementing":
          if (this.state.currentIndex === this.state.currentItem.length) {
            this.setState((p) => ({
              ...p,
              action: "waiting",
              waitTime: this.props.delay * 1000,
            }));
          } else {
            this.setState((p) => ({
              ...p,
              currentIndex: p.currentIndex + 1,
            }));
          }
          break;
        case "waiting":
          if (this.state.waitTime <= 0) {
            this.setState((p) => ({
              ...p,
              action: p.currentIndex === 0 ? "incrementing" : "decrementing",
            }));
          } else {
            this.setState((p) => ({
              ...p,
              waitTime: p.waitTime - this.updateTime,
            }));
          }
          break;
        case "decrementing":
          if (this.state.currentIndex === 0) {
            this.setState((p) => {
              const smallerList = remove(this.props.items, p.currentItem);
              const index = randomInt(0, smallerList.length - 1);
              console.log({ smallerList, index, item: smallerList[index] });
              return {
                ...p,
                action: "incrementing",
                currentItem: smallerList[index],
              };
            });
          } else {
            this.setState((p) => ({
              ...p,
              currentIndex: p.currentIndex - 1,
            }));
          }
          break;
      }
      console.log(randomFactor());
      this.intervals.push(setTimeout(update, this.updateTime * randomFactor()));
    };
    update();
    this.intervals.push(
      setInterval(() => {
        this.setState((p) => ({ ...p, cursorShowing: !p.cursorShowing }));
      }, this.cursorFlashTime)
    );
  }

  public render = () => {
    const { currentIndex, currentItem } = this.state;
    const color = this.props.color || "white";
    // console.log(JSON.stringify(this.state, null, 4));
    return (
      <div
        style={{
          color,
          fontSize: 12,
          font: this.props.font || "15px sans-serif",
          paddingLeft: 5,
          paddingRight: 5,
        }}
      >
        <span style={{ color }}>
          {currentIndex === 0 ? " " : currentItem.slice(0, currentIndex)}
        </span>

        <div
          style={{
            display: "inline",
            width: "1rem",
            height: "100%",
            backgroundColor: this.state.cursorShowing ? color : "transparent",
          }}
        >
          &nbsp;
        </div>
      </div>
    );
  };
}
