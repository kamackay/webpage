import React from "react";
import { LoadingProps, LoadingState } from "src/model/LoadingModel";
import LoadingComponent from "../components/LoadingComponent";
import TypingComponent from "../components/TypingComponent";
import "./GiftIdeasPage.css";

interface TestState extends LoadingState {
  nothing?: string;
}

export default class GiftIdeaPage extends LoadingComponent<
  LoadingProps,
  TestState
> {
  constructor(p: LoadingProps) {
    super(p);
    this.state = {
      loading: true,
      loadAfter: [],
      title: "Test Page"
    };
  }

  public componentDidMount() {
    super.componentDidMount();
  }

  public renderPostLoad() {
    return (
      <div>
        <TypingComponent
          items={[
            "Docker",
            "Kubernetes",
            "Java",
            "Javascript",
            "Typescript",
            "Python"
          ]}
          delay={4}
        />
      </div>
    );
  }
}
