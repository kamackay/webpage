import * as React from "react";
import KeithProps from "src/model/KeithProps";
import KeithState from "src/model/KeithState";

export default class KeithComponent<
  P extends KeithProps,
  S extends KeithState
  > extends React.Component<P, S> {
  constructor(p: P) {
    super(p);
  }

  public setState<K extends keyof S>(
    state:
      | ((prevState: Readonly<S>, props: Readonly<P>) => Pick<S, K> | S | null)
      | (Pick<S, K> | S | null),
    callback?: () => void
  ): void {
    super.setState(state, callback);

    if ((state as S) !== undefined) {
      if (this.state.title) {
        document.title = this.state.title!;
      }
      if (this.state.faviconUrl) {
        this.setFavicon(this.state.faviconUrl!);
      }
    }
  }

  public setFavicon(url: string) {
    const link =
      (document.querySelector("link[rel*='icon']") as HTMLLinkElement) ||
      document.createElement("link");
    link.type = "image/x-icon";
    link.rel = "shortcut icon";
    link.href = url;
    document.getElementsByTagName("head")[0].appendChild(link);
  }

  protected log = (...args: any[]) => {
    // tslint:disable-next-line:no-console
    console.log(...args);
  }
}
