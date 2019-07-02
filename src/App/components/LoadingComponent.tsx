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
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        maxWidth: "unset",
        backgroundColor: "rgba(0,0,0,0.85)",
        textAlign: "center"
      }}
    >
      <span
        style={{
          backgroundColor: "transparent",
          paddingTop: "250px",
          height: "100px",
          display: "inline-block",
          marginLeft: "auto",
          marginRight: "auto"
        }}
      >
        <Spinner color="white" name="ball-scale-multiple" fadeIn="half" />
        <div style={{ position: "absolute", left: 0, width: "100vw" }}>
          <h1 style={{ marginTop: 100, textAlign: "center", color: "white" }}>
            Loading
          </h1>
        </div>
      </span>
    </div>
  );

  public componentDidMount() {
    const setState = this.setState.bind(this);
    const onLoad = this.onLoad.bind(this);
    const promises: Array<Promise<any>> =
      this.state.loadAfter! || new Array([Promise.resolve(null)]);
    Promise.all(promises).finally(() => {
      window.addEventListener("load", () => {
        setTimeout(() => {
          setState({ ...this.state, loading: false });
          onLoad();
        }, this.getLoadTime());
      });
      const seconds = 1.5;
      // If the page still hasn't rendered after this many seconds, just go ahead and try
      setTimeout(() => {
        setState({ ...this.state, loading: false });
        onLoad();
      }, seconds * 1000);
    });
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

    return loading ? (
      <React.Fragment>
        {this.renderPostLoad()}
        {this.loadingElement}
      </React.Fragment>
    ) : (
      this.renderPostLoad()
    );
  }

  protected getLoadTime(): number {
    return 500;
  }
}
