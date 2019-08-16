import { TextField, Typography } from "@material-ui/core";
import classNames from "classnames";
import QRCode from "qrcode";
import React from "react";
import Settings from "src/lib/Settings";
import { LoadingProps, LoadingState } from "src/model/LoadingModel";
import LoadingComponent from "../components/LoadingComponent";
import "./QRPage.css";

interface QRState extends LoadingState {
  url: string;
}

export default class QRPage extends LoadingComponent<LoadingProps, QRState> {
  private settings = Settings.getInstance();
  constructor(p: LoadingProps) {
    super(p);
    this.state = {
      loading: true,
      url: ""
    };
  }

  public componentDidMount() {
    super.componentDidMount();
    setTimeout(
      () => this.setUrl(this.settings.get(Settings.CommonSettings.QR_URL, "")),
      1000
    );
  }

  public renderPostLoad() {
    const { url } = this.state;
    return (
      <form
        noValidate={true}
        autoComplete="off"
        className={classNames("container", "qr-page")}
      >
        <Typography
          component="h2"
          variant="h1"
          gutterBottom={true}
          style={{ color: "white" }}
        >
          QR Generator
        </Typography>
        <TextField
          autoFocus={true}
          autoComplete="off"
          name="url"
          value={url}
          placeholder="URL"
          onChange={e => this.setUrl(e.target.value)}
          style={{ width: "100%", borderRadius: 25 }}
        />

        <div
          style={{
            width: "100%",
            textAlign: "center",
            paddingTop: "10vh"
          }}
        >
          <canvas id="canvas" />
        </div>
      </form>
    );
  }

  private setUrl = (url: string): void => {
    this.setState(p => ({ ...p, url }));
    const element = document.getElementById("canvas");
    if (element) {
      (QRCode as any).toCanvas(
        element,
        url || "Enter Something",
        (error: any) => {
          if (error) {
            console.error(error);
          }
        }
      );
    }
    this.settings.set(Settings.CommonSettings.QR_URL, url);
  };
}
