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
      fontSize: 20,
      value: "",
      rows: 10
    };
  }

  public onLoad() {
    window.addEventListener("resize", this.resize);
    this.resize();
  }

  public renderPostLoad(): JSX.Element {
    return (
      <div id="page" className="container">
        <Typography
          component="h2"
          variant="h1"
          gutterBottom={true}
          style={{ color: "white" }}
        >
          JSON Formatter
        </Typography>
        <Card>
          <textarea
            id="jsonCode"
            value={this.state.value}
            onChange={this.change}
            style={{
              width: "100%",
              minHeight: "20vh",
              maxHeight: "80vh",
              fontSize: this.state.fontSize
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
  }

  private getButton(text: string, handler: () => void) {
    return (
      <Button
        onClick={() => handler()}
        type="button"
        variant="contained"
        color="primary"
        style={{ width: "50%" }}
      >
        {text}
      </Button>
    );
  }

  private format = (f: number | undefined) => {
    const { value } = this.state;
    try {
      const obj = JSON.parse(value);
      this.setState({
        ...this.state,
        value: JSON.stringify(obj, undefined, f)
      });
    } catch (err) {
      this.log(err);
    }
  }

  private change = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    this.setState({ ...this.state, value: event.target.value });
  }
}

export default JSONFormatter;
