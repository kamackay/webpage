import { Box, Button, Form, Grommet, grommet, TextInput } from "grommet";
import { FormSearch } from "grommet-icons";
import { deepMerge } from "grommet/utils";
import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoadingState } from "src/model/LoadingModel";
import WebFont from "webfontloader";
import asyncComponent from "../components/asyncComponent";
import Page from "./Page";

const AnimatedBackground = asyncComponent(() =>
  import("../components/AnimatedBackground")
);

// tslint:disable-next-line: no-empty-interface
interface Props {}
interface State extends LoadingState {
  searchText: string;
}

export default class SearchPage extends Page<Props, State> {
  constructor(p: Props) {
    super(p);
    this.state = {
      loading: true,
      title: "Search",
      loadAfter: [this.loadFonts()],
      searchText: ""
    };
  }

  public renderPostLoad = () => {
    return (
      <>
        <AnimatedBackground />
        <Grommet
          themeMode="dark"
          theme={deepMerge(grommet, {
            global: {
              colors: {
                brand: "blue",
                active: "blue",
                focus: "blue",
                control: {
                  dark: "#111"
                },
                black: "#111"
              },
              font: {
                family: "Roboto",
                size: "18px",
                height: "20px"
              }
            }
          })}
          children={
            <Box
              alignContent="center"
              pad={{ left: "xlarge", right: "xlarge" }}
              style={{ position: "fixed", top: "20vh", width: "100%" }}
              children={
                <Form onSubmit={this.search}>
                  <ToastContainer position="bottom-right" />
                  <Box
                    as="div"
                    fill="horizontal"
                    children="Search"
                    alignContent="center"
                    pad="small"
                    style={{
                      fontSize: 50,
                      display: "inline-block",
                      textAlign: "center"
                    }}
                  />
                  <Box
                    fill="horizontal"
                    pad="small"
                    children={
                      <TextInput
                        autoFocus={true}
                        onChange={this.searchChange}
                        value={this.state.searchText}
                        placeholder="What do you want to look up?"
                      />
                    }
                  />
                  <Box
                    fill="horizontal"
                    margin={{ top: "small" }}
                    children={
                      <Button
                        color="brand"
                        type="submit"
                        label="Search"
                        primary={true}
                        fill="horizontal"
                        alignSelf="center"
                        style={{ color: "white" }}
                        icon={<FormSearch color="white" />}
                      />
                    }
                  />
                </Form>
              }
            />
          }
        />
      </>
    );
  };

  private search = () => {
    const { searchText } = this.state;
    if (!!searchText) {
      window.location.href = `https://www.startpage.com/do/dsearch?query=${searchText}&language=english`;
    } else {
      toast(`Please Enter something to search for!`, { type: "info" });
    }
  };

  private searchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    this.setState(prev => ({ ...prev, searchText: value }));
  };

  private loadFonts = () =>
    new Promise(resolve => {
      WebFont.load({
        google: {
          families: ["Roboto"]
        },
        active: () => {
          resolve();
        }
      });
    });
}
