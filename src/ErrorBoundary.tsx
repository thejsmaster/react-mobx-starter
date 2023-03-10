import React from "react";
export class ErrorBoundary extends React.Component {
  state: any;
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  //@ts-ignore
  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  //@ts-ignore
  componentDidCatch(error: any, errorInfo: any) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <span style={{ color: "red" }}>error occured</span>;
    }

    //@ts-ignore
    return this.props.children;
  }
}
