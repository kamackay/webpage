import React, { Component } from "react";

interface AsyncComponentState {
  component: any;
}

export default function asyncComponent(importComponent: any) {
  class AsyncComponent extends Component<any, AsyncComponentState> {
    constructor(props: any) {
      super(props);

      this.state = {
        component: null
      };
    }

    public async componentDidMount() {
      const { default: component } = await importComponent();

      this.setState({ component });
    }

    public render() {
      const C = this.state.component;

      return C ? <C {...this.props} /> : null;
    }
  }

  return AsyncComponent;
}
