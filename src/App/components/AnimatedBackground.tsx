import React, { CSSProperties } from "react";

interface Props {
  style: CSSProperties;
}
interface State {
  something?: string;
}

export default class AnimatedBackground extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  public render() {
    return (
      <div
        style={{
          ...this.props.style,
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: "100vw"
        }}
        children={<svg children={<></>} />}
      />
    );
  }
}
