import * as React from "react";
import * as Spinner from "react-spinkit";
import { LoadingProps, LoadingState } from "src/model/LoadingModel";
import KeithComponent from "./KeithComponent";

export default abstract class LoadingComponent<
  P extends LoadingProps,
  S extends LoadingState
> extends KeithComponent<P, S> {
  public loadingElement = (
    <div
      className="container loading"
      style={{
        backgroundColor: "transparent",
        textAlign: "center"
      }}
    >
      <span
        style={{
          backgroundColor: "transparent",
          width: "100px",
          paddingTop: "250px",
          height: "100px",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto"
        }}
      >
        <Spinner name="ball-scale-multiple" fadeIn="half" />
      </span>
    </div>
  );

  public componentDidMount() {
    const setState = this.setState.bind(this);
    const onLoad = this.onLoad.bind(this);
    window.addEventListener("load", () => {
      setTimeout(() => {
        setState({ ...this.state, loading: false });
        onLoad();
      }, this.getLoadTime());
    });
    setTimeout(() => {
      // If the page still hasn't rendered after 10 seconds, just go ahead and try
      setState({ ...this.state, loading: false });
    }, 10000);
  }

  public onLoad() {
    // NO-OP
  }

  public abstract renderPostLoad(): JSX.Element;

  public render() {
    const { loading } = this.state;
    if (loading) {
      return this.loadingElement;
    }

    return this.renderPostLoad();
  }

  protected getLoadTime(): number {
    return 500;
  }
}
