import { Button, Card, Typography } from "@material-ui/core";
import * as React from "react";
import JSONFormatState from "src/model/jsonFormatter/JSONFormatModel";
import "./JSONFormatter.css";
import Page from "./Page";

class JSONFormatter extends Page<any, JSONFormatState> {
  constructor(p: any) {
    super(p);
    this.state = {
      title: "Json Formatter",
      loading: true,
      fontSize: 15,
      value: "",
      rows: 10
    };
  }

  public onLoad = () => {
    window.addEventListener("resize", this.resize);
    this.resize();
  };

  public renderPostLoad(): JSX.Element {
    return (
      <div id="page">
        <Typography
          component="h3"
          variant="h2"
          gutterBottom={true}
          style={{ color: "white" }}
        >
          JSON Formatter
        </Typography>
        <Card style={{ backgroundColor: "#222" }}>
          <textarea
            id="jsonCode"
            value={this.state.value}
            onChange={this.change}
            style={{
              width: "100%",
              color: "white",
              resize: "none",
              minHeight: "20vh",
              maxHeight: "90vh",
              fontSize: this.state.fontSize,
              backgroundColor: "transparent"
            }}
            // label="JSON"
            rows={this.state.rows}
            placeholder="Enter JSON here"
            // multiline={true}
            // margin="normal"
          />
          <div style={{ margin: 20 }}>
            {this.getButton("Format", () => this.format(4))}
            {this.getButton("Minify", () => this.format(undefined))}
          </div>
        </Card>
      </div>
    );
  }

  protected resize = () => {
    const rows = Math.floor((window.innerHeight / this.state.fontSize) * 0.5);
    this.log(`Setting to ${rows} rows`);
    this.setState({ ...this.state, rows });
  };

  private getButton(text: string, handler: () => void) {
    return (
      <div
        style={{
          width: "50%",
          paddingLeft: 5,
          paddingRight: 5,
          display: "inline-block"
        }}
        children={
          <Button
            type="button"
            color="primary"
            children={text}
            onClick={handler}
            size="large"
            style={{ width: "100%" }}
            variant="contained"
          />
        }
      />
    );
  }

  private format = (f: number | undefined) => {
    const { value } = this.state;
    try {
      const obj = JSON.parse(value);
      this.setState(prev => ({
        ...prev,
        value: JSON.stringify(obj, undefined, f)
      }));
    } catch (err) {
      this.log(err);
    }
  };

  private change = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    this.setState({ ...this.state, value: event.target.value });
  };
}

export default JSONFormatter;
