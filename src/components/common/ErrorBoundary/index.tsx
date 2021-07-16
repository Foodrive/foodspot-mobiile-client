import React from "react";
import ErrorScreen from "@app/screens/Error";

// Wrapper component for gracefully handling code errors.
// If something goes wrong with the code (e.g. unhandled exceptions, undefined variables, etc)
// The error would go through this component and then render an error screen
// instead of abruptly crashing the app

// Can also be extended for analytics and custom logging to a monitoring
// instance

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<any, ErrorBoundaryState> {
  constructor(props: any) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // TODO add logger
    console.log(error);
    console.log(errorInfo);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return <ErrorScreen />;
    }
    return children;
  }
}

export default ErrorBoundary;
