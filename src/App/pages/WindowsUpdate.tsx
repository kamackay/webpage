import * as React from "react";
import { LoadingProps, LoadingState } from "src/model/LoadingModel";
import Page from "./Page";
import "./WindowsUpdate.css";

interface WindowsUpdateState extends LoadingState {
  progress: number;
}

export default class WindowsUpdate extends Page<
  LoadingProps,
  WindowsUpdateState
> {
  constructor(p: LoadingProps) {
    super(p);

    this.state = {
      loading: true,
      progress: 0
    };
  }

  public renderPostLoad() {
    return <div>TODO</div>;
  }
}
