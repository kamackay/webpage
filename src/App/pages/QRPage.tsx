import { TextField, Typography } from "@material-ui/core";
import classNames from "classnames";
import React from "react";
import { LoadingProps, LoadingState } from "src/model/LoadingModel";
import LoadingComponent from "../components/LoadingComponent";
import "./QRPage.css";

interface QRState extends LoadingState {
  url: string;
}

export default class QRPage extends LoadingComponent<LoadingProps, QRState> {
  constructor(p: LoadingProps) {
    super(p);
    this.state = {
      loading: true,
      url: ""
    };
  }

  public renderPostLoad() {
    const { url } = this.state;
    return (
      <div className={classNames("container", "qr-page")}>
        <Typography
          component="h2"
          variant="h1"
          gutterBottom={true}
          style={{ color: "white" }}
        >
          QR Generator
        </Typography>
        <TextField
          name="url"
          placeholder="URL"
          value={url}
          style={{ width: "100%", borderRadius: 25 }}
        />
      </div>
    );
  }
}
