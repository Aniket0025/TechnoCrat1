import React from "react";

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<React.PropsWithChildren, ErrorBoundaryState> {
  constructor(props: React.PropsWithChildren) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div style={{ padding: 32, textAlign: "center", color: "red" }}>Something went wrong. Please try refreshing the page.</div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
