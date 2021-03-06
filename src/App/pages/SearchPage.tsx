import React from "react";
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
  // private form = React.createRef<HTMLFormElement>();

  constructor(props: Props) {
    super(props);
    this.state = {
      loading: true,
      searchText: "",
      title: "Search",
      loadAfter: [this.loadFonts()],
      faviconUrl: "/images/search.png",
    };
  }

  public renderPostLoad = () => {
    return (
      <>
        <AnimatedBackground />
        //Todo: Fix Grommet Imports
        {/* <Grommet
          themeMode="dark"
          theme={deepMerge(grommet, {
            global: {
              colors: {
                brand: "blue",
                active: "blue",
                focus: "blue",
                control: {
                  dark: "#111",
                },
                black: "#111",
              },
              font: {
                family: "Roboto",
                size: "18px",
                height: "20px",
              },
            },
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
                      textAlign: "center",
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
                        icon={<SearchIcon color="action" />}
                      />
                    }
                  />
                  <form
                    method="POST"
                    ref={this.form}
                    style={{ display: "none" }}
                    action="https://duckduckgo.com"
                  >
                    <input name="q" value={this.state.searchText} />
                  </form>
                </Form>
              }
            />
          }
        /> */}
      </>
    );
  };

  // private search = () => {
  //   const { searchText } = this.state;
  //   if (!!searchText && !!this.form.current) {
  //     this.form.current.submit();
  //   } else {
  //     toast(`Please Enter something to search for!`, { type: "info" });
  //   }
  // };

  // private searchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value } = event.target;
  //   this.setState((prev) => ({ ...prev, searchText: value }));
  // };

  private loadFonts = () =>
    new Promise((resolve) => {
      WebFont.load({
        google: {
          families: ["Roboto"],
        },
        active: () => {
          resolve();
        },
      });
    });
}
